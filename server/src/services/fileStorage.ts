import multer from "multer";
import path from "path";


const multerStorage = (imagePath: string, extension: any) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            let img_path = imagePath ? imagePath : "/images"
            cb(null, path.join(__dirname, `../public${img_path}`))
        },
        filename: function (req, file, cb) {
            if (extension) {
                cb(null, `${file.fieldname}-${Date.now()}${extension}`)
            }
            else {
                cb(null, `${file.fieldname}-${Date.now()}.png`)
            }

        }
    })
}



const multerStorageCustom = (imagePath: string) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            let img_path = imagePath ? imagePath : "/images"
            cb(null, path.join(__dirname, `../public${img_path}`))
        },
        filename: function (req, file, cb) {
            console.log(file)
            cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)

        }
    })
}


export {
    multerStorage,
    multerStorageCustom
}