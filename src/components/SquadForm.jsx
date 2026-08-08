import React from 'react';
import { Users, Plus, Trash2, Upload } from 'lucide-react';

export default function SquadForm({
  squadName,
  setSquadName,
  members,
  setMembers,
}) {
  const updateMember = (index, field, value) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const handlePhotoUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      updateMember(index, 'imgSrc', e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const addMember = () => {
    if (members.length >= 4) return;
    setMembers([
      ...members,
      { name: `BUILDER ${members.length + 1}`, handle: `@hacker${members.length + 1}`, role: 'HACKER', imgSrc: null },
    ]);
  };

  const removeMember = (index) => {
    if (members.length <= 1) return;
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 p-5 rounded-2xl bg-hhg-card border border-hhg-border">
      <div className="flex items-center justify-between border-b border-hhg-border pb-3">
        <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Users className="w-4 h-4 text-hhg-lime" />
          <span>Squad / Team Frame Details</span>
        </h3>
        <span className="text-[10px] font-mono text-hhg-lime bg-hhg-lime/10 px-2 py-0.5 rounded border border-hhg-lime/30 font-bold">
          TEAM MODE
        </span>
      </div>

      {/* Squad Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono text-hhg-muted">Team / Squad Name:</label>
        <input
          type="text"
          value={squadName}
          onChange={(e) => setSquadName(e.target.value)}
          placeholder="e.g. GOA BUILDERS SQUAD"
          className="w-full px-3.5 py-2.5 rounded-xl bg-hhg-bg border border-hhg-border text-sm text-white focus:outline-none focus:border-hhg-lime font-bold"
        />
      </div>

      {/* Members List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-mono text-hhg-muted">
          <span>Teammates ({members.length} / 4):</span>
          {members.length < 4 && (
            <button
              onClick={addMember}
              className="flex items-center gap-1 text-slate-950 font-bold bg-hhg-lime hover:bg-hhg-limeHover px-3 py-1 rounded-xl shadow-glow-lime text-xs transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Teammate
            </button>
          )}
        </div>

        {members.map((member, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-hhg-bg border border-hhg-border space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-hhg-lime">
              <span>Teammate #{idx + 1}</span>
              {members.length > 1 && (
                <button
                  onClick={() => removeMember(idx)}
                  className="text-rose-400 hover:text-rose-300 p-1"
                  title="Remove Teammate"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={member.name}
                onChange={(e) => updateMember(idx, 'name', e.target.value)}
                placeholder="Name"
                className="px-2.5 py-1.5 rounded-lg bg-hhg-card border border-hhg-border text-xs text-white"
              />
              <input
                type="text"
                value={member.handle}
                onChange={(e) => updateMember(idx, 'handle', e.target.value)}
                placeholder="@handle"
                className="px-2.5 py-1.5 rounded-lg bg-hhg-card border border-hhg-border text-xs text-hhg-lime font-mono"
              />
              <input
                type="text"
                value={member.role}
                onChange={(e) => updateMember(idx, 'role', e.target.value)}
                placeholder="Role (e.g. Frontend)"
                className="px-2.5 py-1.5 rounded-lg bg-hhg-card border border-hhg-border text-xs text-slate-300"
              />
            </div>

            {/* Teammate Photo Upload */}
            <div className="flex items-center gap-3 pt-1">
              {member.imgSrc ? (
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className="w-10 h-10 rounded-lg object-cover border border-hhg-lime"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-hhg-card border border-hhg-border flex items-center justify-center text-hhg-muted text-xs">
                  Photo
                </div>
              )}

              <label className="cursor-pointer text-xs font-mono text-hhg-muted hover:text-hhg-lime flex items-center gap-1 bg-hhg-card px-2.5 py-1.5 rounded-lg border border-hhg-border">
                <Upload className="w-3.5 h-3.5" />
                <span>{member.imgSrc ? 'Change Photo' : 'Upload Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handlePhotoUpload(idx, e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
