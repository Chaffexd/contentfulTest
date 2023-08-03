import { useState, useEffect } from 'react';
import * as contentful from 'contentful';
import './App.css';
import Landing from './components/header/Landing';
import Posts from './components/posts/Posts';

// required for live preview
// this hook, requries the original entry data, serves as a ref point for tracking any changes made to that entry
import { ContentfulLivePreview } from '@contentful/live-preview';
import { useContentfulLiveUpdates, useContentfulInspectorMode } from '@contentful/live-preview/react';

ContentfulLivePreview.init({
  locale: 'en-US', // This is required and allows you to set the locale once and have it reused throughout the preview
  enableInspectorMode: true, // This allows you to toggle the inspector mode which is on by default
  enableLiveUpdates: true, // This allows you to toggle the live updates which is on by default
  debugMode: false, // This allows you to toggle the debug mode which is off by default
});

const client = contentful.createClient({
  space: import.meta.env.VITE_spaceKey || process.env.SPACE_KEY,
  accessToken: import.meta.env.VITE_accessKey || process.env.ACCESS_KEY,
  environment: 'master'
});


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

  // this takes the original data as an argument, in my case it's posts.
  const updatedPosts = useContentfulLiveUpdates(posts);

  const inspectorProps = useContentfulInspectorMode();
  // console.log(header.sys.id)

  if(!header?.sys?.id) 
  return <></>

  return (
    
    <>
      <div className="holdingDiv" 
      // This requires, entryId, fieldId and locale
      {...inspectorProps({
        entryId: header.sys.id,
        fieldId: "title",
      })}
      >
        {header.fields.title}
        {header && <Landing title={header.fields.title} landingImage={header.fields.logo.fields.file.url} />}
      </div>
      <main>
        {updatedPosts.map((post, index) => (
          <Posts key={index} post={post} />
        ))}
      </main>
    </>
  );
};

export default App;
