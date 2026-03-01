import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../css/profile.css';

const getImageUrl = (path) => {
  if (!path) return 'https://placehold.co/150x150/EFEFEF/AAAAAA?text=No+Image';

  // ✅ Normalize slashes + remove leading slash
  const cleanPath = path.replace(/\\/g, '/').replace(/^\/+/, '');

  return `http://localhost:5000/${cleanPath}`;
};

function Profile() {
  const { user, token, login, logout } = useAuth();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          'http://localhost:5000/api/profile/me',
          { headers: { 'x-auth-token': token } }
        );

        // ✅ Prevent unnecessary context updates
        if (JSON.stringify(response.data) !== JSON.stringify(user)) {
          login({ token, user: response.data });
        }

      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate('/login');
        } else {
          setError('Could not fetch profile data.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]); // ✅ safer dependency

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError('');
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (isUploading) return; // ✅ Prevent spam

    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      setIsUploading(true);
      setError('');
      setMessage('Uploading...');

      const response = await axios.post(
        'http://localhost:5000/api/profile/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token,
          },
        }
      );

      login({ token, user: response.data.user });

      setMessage(response.data.message);
      setSelectedFile(null);

      // ✅ Reset file input properly
      event.target.reset();

    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
        return;
      }

      setError(err.response?.data?.message || 'Upload failed.');
      setMessage('');

    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return <div className="loading-container">Loading profile...</div>;
  }

  if (!user) {
    return <div className="error-container">Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">

        <div className="profile-header">
          <img
            src={getImageUrl(user.profileImage)}
            alt="Profile"
            className="profile-picture"
          />
          <h1 className="profile-title">{user.name}'s Profile</h1>
        </div>

        <div className="profile-upload-section">
          <h3>Update Profile Picture</h3>

          <form onSubmit={handleUpload}>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />

            <button type="submit" disabled={!selectedFile || isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </form>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="info-message">{message}</p>}
        </div>

        <div className="profile-details">
          <div className="detail-item"><strong>Name:</strong><span>{user.name}</span></div>
          <div className="detail-item"><strong>Voter ID:</strong><span>{user.voterId}</span></div>
          <div className="detail-item"><strong>Email:</strong><span>{user.email}</span></div>
          <div className="detail-item"><strong>Role:</strong><span className="user-role">{user.role}</span></div>
          <div className="detail-item">
            <strong>Voting Status:</strong>
            <span>{user.hasVoted ? 'Already Voted' : 'Not Voted Yet'}</span>
          </div>
        </div>

        <div className="profile-actions">
          {user.role === 'admin' ? (
            <Link to="/onlinevoting" className="action-button">
              Go to Admin Panel
            </Link>
          ) : (
            <Link to="/voting" className="action-button">
              Go to Voting Page
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;