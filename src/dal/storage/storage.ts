import { storage } from "../../config/firebase";

export default class StorageManager {


    public async uploadImage(ref: string, file: File) {
        await storage.ref().child(ref).put(file).then((image) => console.log(image.downloadURL));
    }

}