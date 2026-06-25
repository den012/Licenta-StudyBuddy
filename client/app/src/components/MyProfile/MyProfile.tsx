import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AppNav from '../helper/AppNav';

import { MyProfileStyle } from './MyProfileStyle';

const API_URL = import.meta.env.VITE_API_URL;

interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar?: string;
  yob?: number;
}

interface UserSkills {
  know: string[];
  wantToLearn: string[];
}

type SkillCategory = 'know' | 'wantToLearn';
type StyleVariant = 'filled' | 'outlined';

const MyProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [skills, setSkills] = useState<UserSkills>({
    know: [],
    wantToLearn: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [editedSkills, setEditedSkills] = useState<UserSkills>({
    know: [],
    wantToLearn: [],
  });
  const [newKnowSkill, setNewKnowSkill] = useState('');
  const [newWantToLearnSkill, setNewWantToLearnSkill] = useState('');
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async (): Promise<void> => {
    try {
      await Promise.all([loadProfile(), loadSkills(), loadAvailableSkills()]);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProfile = async (): Promise<void> => {
    const response = await axios.get(`${API_URL}/me`);
    const profileData = response.data.data;
    setProfile(profileData);
    setEditedProfile(profileData);
  };

  const loadSkills = async (): Promise<void> => {
    const response = await axios.get(`${API_URL}/my-skills`);
    const skillsData = response.data.data || { know: [], wantToLearn: [] };
    setSkills(skillsData);
    setEditedSkills(skillsData);
  };

  const loadAvailableSkills = async (): Promise<void> => {
    try {
      const response = await axios.get(`${API_URL}/skills`);
      const skillTitles = response.data.data.map(
        (skill: { title: string }) => skill.title,
      );
      setAvailableSkills(skillTitles);
    } catch (error) {
      console.error('Error fetching available skills:', error);
    }
  };

  const createSkillIfNotExists = async (skillName: string): Promise<void> => {
    if (!availableSkills.includes(skillName)) {
      try {
        await axios.post(`${API_URL}/skills`, { title: skillName });
        setAvailableSkills((prev) => [...prev, skillName]);
      } catch (error) {
        console.error('Error creating skill:', error);
        throw error;
      }
    }
  };

  const saveProfile = async (): Promise<void> => {
    if (!editedProfile) return;

    const { id, ...profileWithoutId } = editedProfile;
    const profilePayload = {
      ...profileWithoutId,
      avatar: editedProfile.avatar === null ? undefined : editedProfile.avatar,
      yob: editedProfile.yob === null ? undefined : editedProfile.yob,
    };

    await axios.patch(`${API_URL}/me`, profilePayload);
    setProfile(editedProfile);
  };

  const saveSkills = async (): Promise<void> => {
    await axios.put(`${API_URL}/my-skills`, editedSkills);
    setSkills(editedSkills);
  };

  const handleSave = async (): Promise<void> => {
    try {
      await Promise.all([saveProfile(), saveSkills()]);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleCancel = (): void => {
    setEditedProfile(profile);
    setEditedSkills(skills);
    setIsEditing(false);
  };

  const addSkill = async (
    category: SkillCategory,
    skillName: string,
  ): Promise<void> => {
    if (!skillName.trim()) return;

    const trimmedSkill = skillName.trim();

    try {
      await createSkillIfNotExists(trimmedSkill);

      setEditedSkills((prevSkills) => ({
        ...prevSkills,
        [category]: [...prevSkills[category], trimmedSkill],
      }));
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const handleAddSkill = async (category: SkillCategory): Promise<void> => {
    const skillValue = category === 'know' ? newKnowSkill : newWantToLearnSkill;
    const setSkillValue =
      category === 'know' ? setNewKnowSkill : setNewWantToLearnSkill;

    await addSkill(category, skillValue);
    setSkillValue('');
  };

  const removeSkill = (category: SkillCategory, index: number): void => {
    setEditedSkills((prevSkills) => ({
      ...prevSkills,
      [category]: prevSkills[category].filter((_, i) => i !== index),
    }));
  };

  const updateProfile = (field: keyof UserProfile, value: string): void => {
    setEditedProfile((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleLogout = (): void => {
    localStorage.clear();
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className={MyProfileStyle.loadingRoot}>
        <div className={MyProfileStyle.loadingText}>Loading...</div>
      </div>
    );
  }

  return (
    <AppNav title="Profile">
      <div className={MyProfileStyle.page}>
        <ProfileHeader
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={handleCancel}
          onLogout={handleLogout}
        />

        <div className={MyProfileStyle.fieldsBlock}>
          <div className={MyProfileStyle.fieldsStack}>
            <ProfileField
              label="Full Name"
              value={profile?.name || 'Anonymous'}
              editValue={editedProfile?.name || ''}
              isEditing={isEditing}
              onChange={(value) => updateProfile('name', value)}
              isTextarea={false}
            />

            <ProfileField
              label="Biography"
              value={profile?.bio || 'No bio written yet.'}
              editValue={editedProfile?.bio || ''}
              isEditing={isEditing}
              onChange={(value) => updateProfile('bio', value)}
              isTextarea={true}
            />
          </div>
        </div>

        <div className={MyProfileStyle.skillsStack}>
          <SkillSection
            title="Classes I'm good at"
            skills={isEditing ? editedSkills.know : skills.know}
            isEditing={isEditing}
            category="know"
            newSkillValue={newKnowSkill}
            onNewSkillChange={setNewKnowSkill}
            onAddSkill={() => handleAddSkill('know')}
            onRemoveSkill={(index) => removeSkill('know', index)}
            styleVariant="filled"
          />

          <SkillSection
            title="I need help with"
            skills={isEditing ? editedSkills.wantToLearn : skills.wantToLearn}
            isEditing={isEditing}
            category="wantToLearn"
            newSkillValue={newWantToLearnSkill}
            onNewSkillChange={setNewWantToLearnSkill}
            onAddSkill={() => handleAddSkill('wantToLearn')}
            onRemoveSkill={(index) => removeSkill('wantToLearn', index)}
            styleVariant="outlined"
          />
        </div>
      </div>
    </AppNav>
  );
};

interface ProfileHeaderProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onLogout: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onLogout,
}) => (
  <div className={MyProfileStyle.headerRow}>
    <h1 className={MyProfileStyle.headerTitle}>Settings</h1>

    <button
      onClick={onLogout}
      className={MyProfileStyle.headerLogout}
    >
      Logout
    </button>

    {!isEditing ? (
      <button onClick={onEdit} className={MyProfileStyle.headerEdit}>
        Edit
      </button>
    ) : (
      <div className={MyProfileStyle.headerEditActions}>
        <button onClick={onSave} className={MyProfileStyle.headerSave}>
          Save
        </button>
        <button onClick={onCancel} className={MyProfileStyle.headerCancel}>
          Cancel
        </button>
      </div>
    )}
  </div>
);

interface ProfileFieldProps {
  label: string;
  value: string;
  editValue: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  isTextarea: boolean;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  value,
  editValue,
  isEditing,
  onChange,
  isTextarea,
}) => (
  <div>
    <label className={MyProfileStyle.fieldLabel}>{label}</label>
    {isEditing ? (
      isTextarea ? (
        <textarea
          value={editValue}
          onChange={(e) => onChange(e.target.value)}
          className={MyProfileStyle.fieldTextarea}
          rows={3}
        />
      ) : (
        <input
          type="text"
          value={editValue}
          onChange={(e) => onChange(e.target.value)}
          className={MyProfileStyle.fieldInput}
        />
      )
    ) : (
      <p
        className={`${MyProfileStyle.displayBase} ${isTextarea ? MyProfileStyle.displayBio : MyProfileStyle.displayName}`}
      >
        {value}
      </p>
    )}
  </div>
);

interface SkillSectionProps {
  title: string;
  skills: string[];
  isEditing: boolean;
  category: SkillCategory;
  newSkillValue: string;
  onNewSkillChange: (value: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (index: number) => void;
  styleVariant: StyleVariant;
}

const SkillSection: React.FC<SkillSectionProps> = ({
  title,
  skills,
  isEditing,
  newSkillValue,
  onNewSkillChange,
  onAddSkill,
  onRemoveSkill,
  styleVariant,
}) => {
  const chipVariantClass =
    styleVariant === 'filled'
      ? MyProfileStyle.skillChipFilled
      : MyProfileStyle.skillChipOutlined;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddSkill();
    }
  };

  return (
    <div>
      <h3 className={MyProfileStyle.sectionTitle}>{title}</h3>

      <div className={MyProfileStyle.chipWrap}>
        {skills.map((skill, index) => (
          <SkillChip
            key={index}
            skill={skill}
            isEditing={isEditing}
            onRemove={() => onRemoveSkill(index)}
            chipVariantClass={chipVariantClass}
            styleVariant={styleVariant}
          />
        ))}
      </div>

      {isEditing && (
        <SkillInput
          value={newSkillValue}
          onChange={onNewSkillChange}
          onAdd={onAddSkill}
          onKeyPress={handleKeyPress}
        />
      )}
    </div>
  );
};

interface SkillChipProps {
  skill: string;
  isEditing: boolean;
  onRemove: () => void;
  chipVariantClass: string;
  styleVariant: StyleVariant;
}

const SkillChip: React.FC<SkillChipProps> = ({
  skill,
  isEditing,
  onRemove,
  chipVariantClass,
  styleVariant,
}) => (
  <span
    className={`${MyProfileStyle.skillChipBase} ${chipVariantClass}`}
  >
    <span className={MyProfileStyle.chipText}>{skill}</span>
    {isEditing && (
      <button
        onClick={onRemove}
        className={
          styleVariant === 'filled'
            ? MyProfileStyle.chipRemoveFilled
            : MyProfileStyle.chipRemoveOutlined
        }
        aria-label={`Remove ${skill}`}
      >
        ×
      </button>
    )}
  </span>
);

interface SkillInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SkillInput: React.FC<SkillInputProps> = ({
  value,
  onChange,
  onAdd,
  onKeyPress,
}) => (
  <div className={MyProfileStyle.skillInputRow}>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={onKeyPress}
      placeholder="Add a skill..."
      className={MyProfileStyle.skillInput}
    />
    <button
      onClick={onAdd}
      disabled={!value.trim()}
      className={MyProfileStyle.skillAddBtn}
    >
      Add
    </button>
  </div>
);

export default MyProfile;
