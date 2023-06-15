  const postsContainer = document.getElementById('posts');

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <p class="author">Author: <span id="author-${post.id}"></span></p>
          <div class="comments" id="comments-${post.id}"></div>
        `;
        postsContainer.appendChild(postElement);

        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
          .then(response => response.json())
          .then(comments => {
            const commentsContainer = document.getElementById(`comments-${post.id}`);

            comments.forEach(comment => {
              const commentElement = document.createElement('div');
              commentElement.classList.add('comment');
              commentElement.innerHTML = `
                <h4>${comment.name}</h4>
                <p>${comment.body}</p>
              `;
              commentsContainer.appendChild(commentElement);
            });
          });

        fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
          .then(response => response.json())
          .then(user => {
            const authorElement = document.getElementById(`author-${post.id}`);
            authorElement.textContent = user.username;
          });
      });
    })
    .catch(error => console.error(error));

