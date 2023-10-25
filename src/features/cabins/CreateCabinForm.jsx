import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm()
   //formState function from react query to get all the errors on the form
  const {errors} = formState;
  //console.log(errors)

  const queryClient = useQueryClient()
  
  const {isLoading, mutate} = useMutation(
    {
      mutationFn: createCabin,
      onSuccess:() => {
        toast.success("New cabin successfully created")
        queryClient.invalidateQueries({
          queryKey: ["cabins"]
        })
        reset()
      },
      onError: (err) => toast.error(err.message),
    }
  )

  function onSubmit(data) {
    mutate({...data, image: data.image[0] })
  }

  function onError(errors) {
    console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label= "Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isLoading}
         {...register("name", {
            required: "This field is required",
          })} />
      </FormRow>
      
      <FormRow label= "Max Capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isLoading}
         {...register("maxCapacity" , {
          required: "This field is required",
          min: {
            value:1,
            message:"Capacity should be at least one"
          },
        })} />
      </FormRow>

      <FormRow label= "Regular Price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isLoading} {...register("regularPrice" , {
          required: "This field is required",
          min: {
            value:1,
            message:"Capacity should be at least one"
          },
        })} />
      </FormRow>
      
      {/* note: getValues() returns an object */}
      <FormRow label= "Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isLoading}
         defaultValue={0} {...register("discount" , {
          required: "This field is required",
          validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price"
        })} />
      </FormRow>

      <FormRow label= "Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isLoading}
         {...register("description" , {
          required: "This field is required",
        })} />
      </FormRow>

      <FormRow label= "Cabin photo">
        <FileInput id="image" accept="image/*" {
          ...register("image", {
            required:"This field is required",
          })
        } />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>{isLoading ? "Adding a cabin..." : "Add cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
