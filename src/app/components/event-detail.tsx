export function EventDetail() {

  const eventDetail =  
    { id: 1, title: 'title 1', description: 'description 1' } ;
  
  return (
    <div className='container'>
      <h1>Welcome to EventDetails!</h1>
      <ul>id: {eventDetail.id}, title: {eventDetail.title}, description: {eventDetail.description}</ul>
    </div>
);
}

