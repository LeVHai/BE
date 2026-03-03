import { formidable } from "formidable";
import path from "path";
import fs from 'fs'

const UPLOAD_IMG_TEMP_DIR =  path.resolve('uploads/images/temp')
const UPLOAD_VIDEO_TEMP_DIR =  path.resolve('uploads/videos/temp')
export const UPLOAD_IMAGE_DIR = path.resolve('uploads/images')
export const UPLOAD_VIDEO_DIR = path.resolve('uploads/videos')

export const initFolder = ()=>{
    ;[UPLOAD_IMG_TEMP_DIR, UPLOAD_VIDEO_TEMP_DIR].forEach(dir =>{
      if(!fs.existsSync(dir)){
        fs.mkdirSync(dir,{
            recursive: true //tạo fodle nested
        })
    }
    })
   
} 


export function getNameFromFullName(fullName){
  const nameArr = fullName.newFilename.split('.')
  nameArr.pop()
  return nameArr.join('')
}

export const handleUploadImage =async (req)=>{
    const form = formidable({
        uploadDir: UPLOAD_IMG_TEMP_DIR,
        maxFiels: 6,
        keepExtensions: true,
        maxFielSize: 1000 * 1024,  //300Kb,
        filter: function ({ name, originalFilename, mimetype }) {
          const valid = mimetype && mimetype.includes("image");
          if (valid === false) {
            form.emit("error", new Error("File type is not valid"));
          }
          return valid 
        },
      });
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            return reject(err);
          }
          console.log(files);
          
          if(!Boolean(files.image)){
            return reject(new Error('File is empty'))
          }
          console.log("files>>>>>>>>>>",files);
          
          resolve(files.image);
        });
      });
}
export const handleUploadVideo =async (req)=>{
    const form = formidable({
        uploadDir:UPLOAD_VIDEO_DIR,
        maxFiels: 1,
        keepExtensions: true,
        maxFielSize: 50 * 1024 * 1024,  //300Kb,
        filter: function ({ name, originalFilename, mimetype }) {
          console.log({ name, originalFilename, mimetype });
          const valid = mimetype && mimetype?.includes('mp4') || mimetype?.includes('quicktime')
          if (!valid) {
            form.emit("error", new Error("File type is not video type"));
          }
         return valid
        },
      });
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            return reject(err);
          }
          if(!Boolean(files.video)){
            return reject(new Error('File is empty'))
          }
          resolve(files.video);
        });
      });
}
export const getExtention = (fullname)=>{
  const namearr = fullname.split('.')
  return namearr[namearr.length - 1]
} 
