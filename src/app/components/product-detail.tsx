export function ProductDetail() {
  
  const productDetail =  
    { id: 1, title: 'title 1', description: 'description 1' } ;
  
  return (
    <div className='container'>
      <h1>Welcome to EventDetails!</h1>
      <ul>id: {productDetail.id}, title: {productDetail.title}, description: {productDetail.description}</ul>
    </div>

  );
}