import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyPosts({ darkMode }) {
  const [reels, setReels] = useState([]);
  const userId = localStorage.getItem('userId') || 'user1';

  useEffect(() => {
    axios.get(`/api/reels/myposts/${userId}`).then(res => setReels(res.data));
  }, []);

  return (
    <div style={{ backgroundColor: darkMode ? '#111' : '#fff', color: darkMode ? '#fff' : '#000', padding: 20 }}>
      <h2>My Uploaded Reels</h2>
      {reels.map(reel => (
        <div key={reel._id} style={{ marginBottom: 20 }}>
          <video src={`http://localhost:5000/${reel.videoUrl}`} width="300" controls />
          <p>{reel.caption}</p>
          <p>❤️ {reel.likes.length}</p>
        </div>
      ))}
    </div>
  );
}

export default MyPosts;
