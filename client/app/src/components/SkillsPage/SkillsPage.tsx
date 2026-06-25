import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from '../../authComponents/LogoutButton';
import SkillSelector from '../helper/SkillSelector';

import { SkillsPageStyle } from './SkillsPageStyle';

interface Skill {
  title: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const SkillsPage: React.FC = () => {
  const navigate = useNavigate();
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [goodAtSkills, setGoodAtSkills] = useState<string[]>([]);
  const [needHelpSkills, setNeedHelpSkills] = useState<string[]>([]);
  const [customGoodAtSkill, setCustomGoodAtSkill] = useState('');
  const [customNeedHelpSkill, setCustomNeedHelpSkill] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem('skillsPageRefreshed');
    if (!hasRefreshed) {
      sessionStorage.setItem('skillsPageRefreshed', 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API_URL}/skills`);
        const skillTitles = response.data.data.map(
          (skill: Skill) => skill.title,
        );
        setAvailableSkills(skillTitles);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setAvailableSkills([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const toggleGoodAtSkill = (skill: string) => {
    setGoodAtSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const toggleNeedHelpSkill = (skill: string) => {
    setNeedHelpSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const addCustomGoodAtSkill = async () => {
    if (
      customGoodAtSkill.trim() &&
      !goodAtSkills.includes(customGoodAtSkill.trim())
    ) {
      const newSkill = customGoodAtSkill.trim();
      try {
        if (!availableSkills.includes(newSkill)) {
          await axios.post(`${API_URL}/skills`, { title: newSkill });
          setAvailableSkills((prev) => [...prev, newSkill]);
        }
        setGoodAtSkills((prev) => [...prev, newSkill]);
        setCustomGoodAtSkill('');
      } catch (error) {
        console.error('Error adding custom skill:', error);
      }
    }
  };

  const addCustomNeedHelpSkill = async () => {
    if (
      customNeedHelpSkill.trim() &&
      !needHelpSkills.includes(customNeedHelpSkill.trim())
    ) {
      const newSkill = customNeedHelpSkill.trim();
      try {
        if (!availableSkills.includes(newSkill)) {
          await axios.post(`${API_URL}/skills`, { title: newSkill });
          setAvailableSkills((prev) => [...prev, newSkill]);
        }
        setNeedHelpSkills((prev) => [...prev, newSkill]);
        setCustomNeedHelpSkill('');
      } catch (error) {
        console.error('Error adding custom skill:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (goodAtSkills.length > 0 || needHelpSkills.length > 0) {
      try {
        const dataToSend = {
          know: goodAtSkills,
          wantToLearn: needHelpSkills,
        };
        console.log('Data to send:', dataToSend);

        await axios.put(`${API_URL}/my-skills`, dataToSend);
        navigate('/home');
      } catch (error) {
        console.error('Error submitting skills:', error);
        alert('Failed to save skills. Please try again.');
      }
    } else {
      alert('Please select at least one skill.');
    }
  };

  if (isLoading) {
    return (
      <div className={SkillsPageStyle.loading}>Loading skills...</div>
    );
  }

  return (
    <div className={SkillsPageStyle.page}>
      <form onSubmit={handleSubmit} className={SkillsPageStyle.form}>
        <div className={SkillsPageStyle.sectionPrimary}>
          <SkillSelector
            title="What classes are you good at?"
            skills={availableSkills}
            selectedSkills={goodAtSkills}
            toggleSkill={toggleGoodAtSkill}
            customSkill={customGoodAtSkill}
            setCustomSkill={setCustomGoodAtSkill}
            addCustomSkill={addCustomGoodAtSkill}
          />
        </div>

        <div className={SkillsPageStyle.sectionSecondary}>
          <SkillSelector
            title="What classes do you need help with?"
            skills={availableSkills}
            selectedSkills={needHelpSkills}
            toggleSkill={toggleNeedHelpSkill}
            customSkill={customNeedHelpSkill}
            setCustomSkill={setCustomNeedHelpSkill}
            addCustomSkill={addCustomNeedHelpSkill}
          />
        </div>

        <div className={SkillsPageStyle.footer}>
          <button type="submit" className={SkillsPageStyle.submitButton}>
            Continue
          </button>

          <div className={SkillsPageStyle.logoutWrapper}>
            <LogoutButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SkillsPage;
