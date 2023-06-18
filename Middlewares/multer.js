const multer = require('multer')
const fs = require('fs')

const defaultPath = 'Public'
const storage = multer.diskStorage({
    destination: async(req, file, cb) => {
        let isDirectoryExist = fs.existsSync(`${defaultPath}/${file.fieldname}`)
        if(!isDirectoryExist){
            await fs.promises.mkdir(`${defaultPath}/${file.fieldname}`, {
                recursive: true
            })
        }
        if(file.fieldname === 'image'){
            cb(null, `${defaultPath}/${file.fieldname}`)
        }
    },
    filename: (req, file, cb) => {
        cb(null, 'PIMG' + '-' + Date.now() + Math.round(Math.random() + 1000000000) + '.' + file.mimetype.split('/')[1])
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype.split('/')[1] === 'jpg' || file.mimetype.split('/')[1] === 'jpeg'){
        cb(null, true)
    }else if(file.mimetype.split('/')[1] !== 'jpg' || file.mimetype.split('/')[1] !== 'jpeg'){
        cb(new Error('file not supported'))
    }
}

exports.multerUpload = multer({storage: storage, fileFilter: fileFilter})
