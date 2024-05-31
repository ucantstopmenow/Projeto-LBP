document.addEventListener('DOMContentLoaded', loadPosts);

function loadPosts() {
    // Esta função irá carregar os posts do banco de dados
    fetch('/getPosts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(posts => {
        const postsContainer = document.getElementById('posts');
        posts.forEach(post => {
            postsContainer.appendChild(createPostElement(post));
        });
    })
    .catch(error => console.error('Erro ao carregar posts:', error));
}

function createPost() {
    const content = document.getElementById('newPostContent').value;
    if (content.trim() === '') return;

    fetch('/createPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conteudo: content })
    })
    .then(response => response.json())
    .then(post => {
        const postsContainer = document.getElementById('posts');
        postsContainer.prepend(createPostElement(post));
        document.getElementById('newPostContent').value = '';
    })
    .catch(error => console.error('Erro ao criar post:', error));
}

function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'post';

    const postHeader = document.createElement('div');
    postHeader.className = 'post-header';

    const userName = document.createElement('span');
    userName.textContent = post.nomeUsuario;

    const likeIcon = document.createElement('span');
    likeIcon.innerHTML = '<i class="material-icons">favorite_border</i>';
    likeIcon.onclick = () => likePost(post.idPost, likeIcon);

    postHeader.appendChild(userName);
    postHeader.appendChild(likeIcon);

    const postContent = document.createElement('div');
    postContent.className = 'post-content';
    postContent.textContent = post.conteudo;

    const postFooter = document.createElement('div');
    postFooter.className = 'post-footer';

    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comentar';
    commentButton.onclick = () => showCommentSection(post.idPost);

    postFooter.appendChild(commentButton);

    const commentSection = document.createElement('div');
    commentSection.className = 'comment-section';
    commentSection.id = `comments-${post.idPost}`;
    commentSection.style.display = 'none';

    postElement.appendChild(postHeader);
    postElement.appendChild(postContent);
    postElement.appendChild(postFooter);
    postElement.appendChild(commentSection);

    return postElement;
}

function likePost(idPost, likeIcon) {
    fetch(`/likePost/${idPost}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            likeIcon.innerHTML = '<i class="material-icons">favorite</i>';
        }
    })
    .catch(error => console.error('Erro ao curtir post:', error));
}

function showCommentSection(postId) {
    const commentSection = document.getElementById(`comments-${postId}`);
    if (commentSection.style.display === 'none') {
        commentSection.style.display = 'block';
        loadComments(idPost);
    } else {
        commentSection.style.display = 'none';
    }
}

function loadComments(idPost) {
    fetch(`/getComments/${idPost}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(comments => {
        const commentSection = document.getElementById(`comments-${idPost}`);
        commentSection.innerHTML = ''; // Limpa os comentários antigos
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';

            const userName = document.createElement('span');
            userName.textContent = comment.nomeUsuario;

            const commentContent = document.createElement('input');
            commentContent.value = comment.conteudo;
            commentContent.readOnly = true;

            commentElement.appendChild(userName);
            commentElement.appendChild(commentContent);
            commentSection.appendChild(commentElement);
        });

        const newComment = document.createElement('div');
        newComment.className = 'comment';

        const userName = document.createElement('span');
        userName.textContent = 'Você';

        const commentContent = document.createElement('input');

        const commentButton = document.createElement('button');
        commentButton.textContent = 'Enviar';
        commentButton.onclick = () => addComment(idPost, commentContent);

        newComment.appendChild(userName);
        newComment.appendChild(commentContent);
        newComment.appendChild(commentButton);

        commentSection.appendChild(newComment);
    })
    .catch(error => console.error('Erro ao carregar comentários:', error));
}

function addComment(idPost, commentContent) {
    const content = commentContent.value;
    if (content.trim() === '') return;

    fetch(`/addComment/${idPost}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conteudo: content })
    })
    .then(response => {
        if (response.ok) {
            loadComments(idPost);
        }
    })
    .catch(error => console.error('Erro ao adicionar comentário:', error));
}
