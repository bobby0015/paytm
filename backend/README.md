# Few Backend Logics

### If you want to filter the data using query paramaters 

##### HTTP Endpoint
```
http://localhost:PORT/api/v1/user/bulk?filter=Div
```

```js
const findUser = async (req, res) => {
    const filter = req.query.filter || "";
    console.log(filter)
    const users = await userModel.find({
        $or: [
            {
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }
        ]
    })
    console.log(users)
    res.status(200).json({
        Users : users.map((user)=>({
            email: user.email,
            firsname: user.firstName,
            lastname: user.lastName,
            id: user._id
        }))
    })
}
```

## Bank Transfer API Module (Paytm Clone Backend)

This module handles secure, atomic balance transfers between user accounts. It utilizes **MongoDB Transactions** to ensure data consistency, meaning money cannot be lost or duplicated if a system failure occurs mid-transaction.

---

### Technical Concept: Database Transactions

In financial systems, moving money requires multiple operations (e.g., checking balance, deducting from User A, and adding to User B). If the server crashes halfway through, data becomes corrupted.

To prevent this, this module uses **ACID Transactions** via Mongoose sessions. If any validation or database operation fails, the entire sequence is rolled back (`abortTransaction`), ensuring absolute data integrity.

---

### Line-by-Line Code Breakdown

1. **`const session = await mongoose.startSession()`**
   * Creates an isolated context or "session" for executing multiple database operations as a single unit.

2. **`session.startTransaction()`**
   * Signals MongoDB to start monitoring operations. All subsequent operations chained to this session will either succeed together or fail together.

3. **`const { amount, sender } = req.body`**
   * Destructures and extracts the transfer amount and the recipient's identifier (`sender`) from the incoming request payload.

4. **`const account = await Account.findOne({ userId: req.userId }).session(session)`**
   * Locates the logged-in sender's account. The `.session(session)` part places a lock on this document so no other concurrent request can change it while this transaction runs.

5. **`if (!account || account.balance < amount) { ... }`**
   * **Validation Check:** Confirms that the account exists and contains sufficient funds to cover the requested transfer amount.

6. **`await session.abortTransaction()`** *(Inside Sender Validation)*
   * Instantly terminates the transaction sequence and rolls back any database modifications made during this session if funds are insufficient.

7. **`return res.status(404).json({ ... })`** / **`return res.status(409).json({ ... })`**
   * Aborts execution and dispatches appropriate HTTP response statuses indicating failure.

8. **`const senderAccount = await Account.findOne({userId: sender}).session(session)`**
   * Queries the database within the current session to ensure the recipient (`sender`) exists before attempting to move money.

9. **`await Account.updateOne({userId: req.userId}, { $inc : {balance : -amount}}).session(session)`**
   * Deducts the transfer amount from the sender's balance using MongoDB's atomic `$inc` operator, safely tied to the active session.

10. **`await Account.updateOne({userId: sender}, {$inc : {balance : amount}}).session(session)`**
   * Deposits the transfer amount into the recipient's balance using the atomic `$inc` operator, locked within the active session.

11. **`await session.commitTransaction()`**
   * Finalizes all pending database changes permanently. If any error happens right up to this point, MongoDB ensures no data is written.

12. **`res.status(200).json({ ... })`**
   * Returns a clean HTTP `200 OK` response to the client indicating a successful transaction.

---

## System Requirements Note

> ⚠️ **Important:** MongoDB transactions require a **Replica Set** (even a single-node local replica set) or a sharded cluster. Attempting to execute this code on a standalone local MongoDB instance will result in a `MongoServerError: Transaction numbers are only allowed on a replica set member or mongos` error.

---

## Implementation Code

```javascript
const transfer = async (req, res) => {
    const session = await mongoose.startSession()

    session.startTransaction()
    const { amount, sender } = req.body

    //Fetch the accounts within the transactions 
    const account = await Account.findOne({ userId: req.userId }).session(session)

    if (!account || account.balance < amount) {
        await session.abortTransaction()
        return res.status(409).json({
            msg: 'Insufficient Balance',
            success: false,
        })
    }

    const senderAccount = await Account.findOne({userId: sender}).session(session)

    if(!senderAccount){
        await session.abortTransaction()
        return res.status(404).json({
            msg: 'Sender not found',
            success: false,
        })
    }

    // Perform the transaction
    await Account.updateOne({userId: req.userId}, { $inc : {balance : -amount}}).session(session)
    await Account.updateOne({userId: sender}, {$inc : {balance : amount}}).session(session)

    //Commit the tranasaction
    await session.commitTransaction()
    
    res.status(200).json({
        msg : 'Payment successfull',
        success : true,
    })
}
```