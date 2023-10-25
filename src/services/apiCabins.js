import supabase, { supabaseUrl } from "./supabase"

export default async function getCabins() {
const { data, error } = await supabase
.from('cabins')
.select('*')

if(error){
    console.error(error);
    throw new Error("Cabins could not be loaded")
}

return data

}

export async function createCabin(newCabin) {
const imageName = ` ${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

//https://ydqectmexeknrjmpumnk.supabase.co/storage/v1/object/public/cabins-images/cabin-002.jpg

const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
// 1. first Create cabin
const { data, error } = await supabase
.from('cabins')
.insert([{...newCabin, image: imagePath}]);

if(error){
    console.error(error)
     throw new Error("Cabin could not be created!")
}

//2. if successfull upload an image
const { error:storageError } = await supabase
  .storage
  .from('cabins-images')
  .upload(imageName, newCabin.image);

//3. Delete the cabin if there was an error uploading image.
if(storageError) {
    await supabase
    .from('cabins')
    .delete()
    .eq('id', data.id);
    console.error(storageError);
    throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
    );
}

return data

}

export async function deleteCabin(id) {
const {data, error } =  await supabase
.from('cabins')
.delete()
.eq('id', id)

if(error){
    console.error(error);
    throw new Error("Cabin could not be deleted!")
}

return data

}