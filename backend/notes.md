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