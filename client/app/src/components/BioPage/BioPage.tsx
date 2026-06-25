import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import LogoutButton from '../../authComponents/LogoutButton';

import { BioPageStyle } from './BioPageStyle';

const MIN_BIO_LENGTH = 20;

const Bio: React.FC = () => {
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateBio = (bioText: string): boolean => {
    return bioText.trim().length >= MIN_BIO_LENGTH;
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateBio(bio)) {
      setError(`Bio must be at least ${MIN_BIO_LENGTH} characters long.`);
      return;
    }

    setIsLoading(true);

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/me`, {
        bio: bio.trim(),
      });
      console.log('Bio updated successfully');
      navigate('/skills');
    } catch (error) {
      console.error('Error updating bio:', error);
      setError('Failed to save bio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = (): string => {
    return isLoading ? 'Saving...' : 'Continue';
  };

  const isSubmitDisabled = (): boolean => {
    return isLoading || !validateBio(bio);
  };

  return (
    <div className={BioPageStyle.page}>
      <h1 className={BioPageStyle.heading}>Tell us more about yourself</h1>

      <form onSubmit={handleSubmit} className={BioPageStyle.form}>
        <div className={BioPageStyle.fieldWrapper}>
          <textarea
            value={bio}
            onChange={handleBioChange}
            className={BioPageStyle.textarea}
            placeholder="Type your bio here..."
            disabled={isLoading}
            aria-label="Bio textarea"
          />

          <div className={BioPageStyle.footerRow}>
            {error && (
              <span className={BioPageStyle.error}>{error}</span>
            )}
            <span className={BioPageStyle.charCount}>
              {bio.length} characters
            </span>
          </div>
        </div>

        <button
          type="submit"
          className={BioPageStyle.submitButton}
          disabled={isSubmitDisabled()}
        >
          {getButtonText()}
        </button>
      </form>

      <div className={BioPageStyle.logoutWrapper}>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Bio;
