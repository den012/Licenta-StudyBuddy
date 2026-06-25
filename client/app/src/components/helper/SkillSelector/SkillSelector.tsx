import React from 'react';

import { SkillSelectorStyle } from './SkillSelectorStyle';

interface SkillSelectorProps {
  title: string;
  skills: string[];
  selectedSkills: string[];
  toggleSkill: (skill: string) => void;
  customSkill: string;
  setCustomSkill: (skill: string) => void;
  addCustomSkill: () => Promise<void>;
}

const SkillSelector: React.FC<SkillSelectorProps> = ({
  title,
  skills,
  selectedSkills,
  toggleSkill,
  customSkill,
  setCustomSkill,
  addCustomSkill,
}) => {
  const getSkillButtonClasses = (skill: string) => {
    return `${SkillSelectorStyle.skillButtonBase} ${selectedSkills.includes(skill) ? SkillSelectorStyle.skillButtonSelected : SkillSelectorStyle.skillButtonUnselected}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomSkill();
    }
  };

  return (
    <div className={SkillSelectorStyle.root}>
      <h1 className={SkillSelectorStyle.title}>{title}</h1>

      <div className={SkillSelectorStyle.skillGrid}>
        {skills.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => toggleSkill(skill)}
            className={getSkillButtonClasses(skill)}
          >
            {skill}
          </button>
        ))}
      </div>

      <div className={SkillSelectorStyle.customRow}>
        <input
          type="text"
          value={customSkill}
          onChange={(e) => setCustomSkill(e.target.value)}
          placeholder="Add a unique skill..."
          className={SkillSelectorStyle.customInput}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          onClick={addCustomSkill}
          className={SkillSelectorStyle.customAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default SkillSelector;
