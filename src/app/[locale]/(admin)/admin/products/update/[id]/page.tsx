import SingleProductComponent from '@/components/admin/products/SingleProduct/SingleProductComponent';


const SingleProductPage = async ({params:{ id }}: any) => {
  return (
    <>
      <SingleProductComponent productId={id}/>
    </>
  )
}

export default SingleProductPage