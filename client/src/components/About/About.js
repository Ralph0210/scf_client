import './about.css'
import React, { useState, useEffect } from 'react';
import Footer from '../Footer/Footer'
import axios from 'axios';

const baseURL = 'http://localhost:3001';

const api = axios.create({
  baseURL: baseURL,
});

const About = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

    const sendMessage = async () => {
      const response = await api.post('/api/chat', { message });
      setConversation([...conversation, { user: message, reply: response.data.reply }]);
      console.log(response.data.reply);
      setMessage('');
    };
  

  const Mailto = ({ email, subject = '', body = '', children }) => {
    let params = subject || body ? '?' : '';
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
  
    return <a href={`mailto:${email}${params}`} target="_blank">{children}</a>;
  };
  return (
    <>
    <div className='about_container'>
      <div className='about-us_text'>
      <h1>About Us</h1>
      <h2>Welcome!</h2>
      <p>This project is under the guidance of Professor Ken-Hou Lin at the University of Texas at Austin, and the website has been developed by Ralph Chang.</p><br/>
      <p>Our team is dedicated to serving individuals, researchers, and policymakers by offering a robust platform for exploring the wealth of insights provided by the Survey of Consumer Finances (SCF). Our primary objective is to enhance your understanding of the financial landscape, advocate for data-driven decision-making, and empower our users with valuable information from this vital survey.</p>
      
    <h1>Contact Us</h1>
    <p>We value your feedback and questions. If you have any inquiries, suggestions, or just want to say hello, please feel free to reach out to us at <Mailto email="ralphchang@utexas.edu" subject="Hello" body="Hello!">
    ralphchang@utexas.edu
  </Mailto>.</p>

  <div className='chatroom'>
      <div className='message'>
        {conversation.map((m, index) => (
          <div key={index}>
            <p>User: {m.user}</p>
            <p>Assistant: {m.reply}</p>
          </div>
        ))}
      </div>
      <input 
        type='text' 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type='submit' onClick={sendMessage}>Enter</button>
    </div>
    
    </div>
    <Footer/>
    </div>
    
    </>
  )
}

export default About