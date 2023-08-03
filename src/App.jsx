import { useState, useEffect } from 'react';
import * as contentful from 'contentful';
import './App.css';
import Landing from './components/header/Landing';
import Posts from './components/posts/Posts';

const client = contentful.createClient({
  space: import.meta.env.VITE_spaceKey || process.env.SPACE_KEY,
  accessToken: import.meta.env.VITE_accessKey || process.env.ACCESS_KEY,
  environment: 'master'
})

function App() {
  const [header, setHeader] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
    // Retrieves one specific entry
      .getEntry('RxDB6mu4oP6j1I8qSOg6A')
      // Handle the API call
      .then((entry) => {
        console.log(entry);
        const navHeader = entry;
        // console.log(navHeader);
        setHeader(navHeader)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    client
      .getEntries({
        content_type: 'post'
      })
      .then((entries) => {
        console.log(entries.items);
        const retrievedPosts = entries.items;
        setPosts(retrievedPosts);
        // console.log(posts)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="holdingDiv">
        {header && <Landing title={header.fields.title} landingImage={header.fields.logo.fields.file.url} />}
      </div>
      <main>
        {posts.map((post, index) => (
          <Posts key={index} post={post} />
        ))}
      </main>
    </>
  );
};

export default App;
