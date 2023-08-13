const bcrypt=require('bcrypt')
const db=require("../models")
const jwt=require('jsonwebtoken')

const User=db.users