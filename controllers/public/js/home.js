const newPostHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const content = document.querySelector('#post-content').value.trim();
   
  
    if (content) {
    
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({content}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };
const handleLike = async (event) => {
console.log(event.target.id);
const response = await fetch(`/api/likes/${event.target.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    location.reload();
  } else {
    alert(response.statusText);
  }
}
  document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostHandler);

