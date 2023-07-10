const Ajv = require("ajv").default;

const schema={
    "type":"object",
    "properties":{
        "dept":{
            "type":"string",
            // "enum":["SD","SA","MD"] ,
            "maxLength":2,
            "minLength":2 
        },
        "fn":{
            "type":"string",
            "pattern":"^[A-Z][a-z]*$" 
        },
        "ln":{
            "type":"string",
            "pattern":"^[A-Z][a-z]*$" 
        },
    },
    "required":["dept","fn","ln"],
    
}

const ajv= new Ajv();
module.exports = ajv.compile(schema)
