import React from 'react';

const Posts = (props) => {
    const { post } = props;

    return (
        <div className="blogPost">
            <h2>{post.fields.postTitle}</h2>
            <p>{post.fields.postBody.content[0].content[0].value}</p>
        </div>
    );
};

export default Posts;