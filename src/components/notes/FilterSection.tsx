import { useClickOutside } from '@/hooks/useClickOutside';
import { RotateCcw, X } from 'lucide-react';
import { useRef, useState, type ChangeEvent } from 'react';

interface FilterPopoverProps {
  tagOptions: string[];
  moodOptions: string[];
  initialTags?: string[];
  initialMoods?: string[];
  onClose: () => void;
  onApply: (data: { tags: string[]; moods: string[] }) => void;
}

export default function FilterPopover({
  tagOptions,
  moodOptions,
  initialTags = [],
  initialMoods = [],
  onClose,
  onApply,
}: FilterPopoverProps) {
  const [tempTags, setTempTags] = useState(initialTags);
  const [tempMoods, setTempMoods] = useState(initialMoods);
  const [tagQuery, setTagQuery] = useState<string>('');
  const [moodQuery, setMoodQuery] = useState<string>('');

  const popoverRef = useRef<HTMLDivElement>(null);
  const tagDropdownRef = useRef<HTMLDivElement>(null);
  const moodDropdownRef = useRef<HTMLDivElement>(null);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isMoodOpen, setIsMoodOpen] = useState(false);

  const handleReset = () => {
    setTempMoods([]);
    setTempTags([]);
    setTagQuery('');
    setMoodQuery('');
  };

  const handleApply = () => {
    onApply({ tags: tempTags, moods: tempMoods });
    onClose();
  };

  const handleTag = (tag: string) => {
    setTempTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
    setTagQuery('');
  };

  const handleMood = (mood: string) => {
    setTempMoods((prev) =>
      prev.includes(mood) ? prev.filter((item) => item !== mood) : [...prev, mood]
    );
    setMoodQuery('');
  };

  const handleSearchTagValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setTagQuery(e.target.value);
  };

  const handleSearchMoodValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setMoodQuery(e.target.value);
  };

  const displayTags = tagOptions.filter((tag) =>
    tag.toLocaleLowerCase().includes(tagQuery.toLocaleLowerCase().trim())
  );

  const displayMoods = moodOptions.filter((item) =>
    item.toLowerCase().trim().includes(moodQuery.toLocaleLowerCase().trim())
  );

  useClickOutside(tagDropdownRef, () => {
    setIsTagOpen(false);
  });
  useClickOutside(moodDropdownRef, () => {
    setIsMoodOpen(false);
  });

  useClickOutside(popoverRef, () => {
    onApply({ tags: tempTags, moods: tempMoods });
    setIsTagOpen(false);
    setIsMoodOpen(false);
    onClose();
  });

  return (
    <>
      <div className="fixed inset-0 z-35 bg-transparent cursor-default" />
      <div
        ref={popoverRef}
        className="absolute top-12 right-0 w-80 max-h-[400px] flex flex-col p-4 gap-3 bg-white/65 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-md z-40 text-xs text-brand-accent-primary"
      >
        <div className="flex items-center justify-between pb-2.5 border-b border-white/40 shrink-0">
          <h3 className="font-semibold text-sm  text-brand-accent-primary tracking-tight">
            Filter
          </h3>
          <button
            onClick={handleReset}
            type="button"
            className="flex items-center gap-1.5 text-xs font-medium text-brand-accent-fourth hover:text-brand-accent-primary active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        <div className="flex-1 overflow-y-auto  px-2 -mr-1 flex flex-col gap-4">
          {/* Section: TAG */}
          <div ref={tagDropdownRef} className="relative flex flex-col gap-1.5 z-45">
            <span className="text-[10px] font-bold text-brand-accent-fourth uppercase tracking-wider px-0.5">
              TAG
            </span>

            <div className="flex flex-col p-2 bg-white/40 backdrop-blur-sm border border-white/70 rounded-2xl focus-within:bg-white/70 focus-within:border-white focus-within:ring-2 focus-within:ring-brand-accent-secondary/20 transition-all shadow-inner">
              {tempTags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap overflow-y-auto max-h-20 mb-1.5 pb-2 pr-0.5">
                  {tempTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-xs shadow-md text-brand-accent-primary text-xs px-2.5 py-1 rounded-xl border border-white/80 font-medium animate-in fade-in-50 duration-150"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTag(tag);
                        }}
                        className="p-0.5 -mr-1 rounded-full hover:bg-black/5 transition-colors"
                      >
                        <X className="w-3 h-3 text-brand-accent-fourth hover:text-brand-accent-primary cursor-pointer" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="relative flex-1 flex items-center">
                <input
                  value={tagQuery}
                  onChange={(e) => handleSearchTagValue(e)}
                  onClick={() => setIsTagOpen(true)}
                  placeholder="Select tag..."
                  className="w-full outline-none text-xs px-1 py-0.5 text-brand-accent-primary placeholder:text-brand-accent-fourth bg-transparent"
                />
                {tagQuery && (
                  <button
                    onClick={() => setTagQuery('')}
                    type="button"
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-brand-accent-fourth hover:text-brand-accent-primary transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {isTagOpen && (
              <div className="absolute z-50 top-full left-0 right-0 mt-1.5 p-1.5 border border-white/80 bg-white/75 backdrop-blur-xl shadow-md/10 rounded-xl animate-in fade-in-0 zoom-in-95 duration-150">
                <div className="max-h-36 overflow-y-auto flex flex-col gap-0.5">
                  {displayTags.length > 0 ? (
                    displayTags.map((tag) => (
                      <label
                        key={tag}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl  hover:bg-brand-accent-secondary/10 active:scale-99 text-brand-accent-primary cursor-pointer transition-all duration-200"
                      >
                        <input
                          type="checkbox"
                          checked={tempTags.includes(tag)}
                          onChange={() => handleTag(tag)}
                          className="sr-only"
                        />
                        <div
                          className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                            tempTags.includes(tag)
                              ? 'bg-brand-accent-secondary border-brand-accent-secondary text-white shadow-xs'
                              : 'border-gray-300/80 bg-white/40 group-hover:border-gray-400'
                          }`}
                        >
                          {tempTags.includes(tag) && (
                            <svg
                              className="w-2.5 h-2.5 stroke-[2]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium">{tag}</span>
                      </label>
                    ))
                  ) : (
                    <div className="px-3 py-3 text-xs text-brand-accent-fourth text-center">
                      Không tìm thấy tag phù hợp
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Section: MOOD */}
          <div ref={moodDropdownRef} className="relative flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-brand-accent-fourth uppercase tracking-wider px-0.5">
              MOOD
            </span>

            <div className="flex flex-col p-2 bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl focus-within:bg-white/70 focus-within:border-white focus-within:ring-2 focus-within:ring-brand-accent-secondary/20 transition-all shadow-inner">
              {tempMoods.length > 0 && (
                <div className="flex gap-1.5 flex-wrap overflow-y-auto max-h-20 mb-1.5 pb-2 pr-0.5">
                  {tempMoods.map((mood) => (
                    <span
                      key={mood}
                      className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-xs shadow-md text-brand-accent-primary text-xs px-2.5 py-1 rounded-xl border border-white/80 font-medium animate-in fade-in-50 duration-150"
                    >
                      {mood}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMood(mood);
                        }}
                        className="p-0.5 -mr-1 rounded-full hover:bg-black/5 transition-colors"
                      >
                        <X className="w-3 h-3 text-brand-accent-fourth hover:text-brand-accent-p cursor-pointer" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="relative flex-1 flex items-center">
                <input
                  value={moodQuery}
                  onChange={(e) => handleSearchMoodValue(e)}
                  onClick={() => setIsMoodOpen(true)}
                  placeholder="Select mood..."
                  className="w-full outline-none text-xs px-1 py-0.5 text-brand-accent-primary placeholder:text-brand-accent-fourth bg-transparent"
                />
                {moodQuery && (
                  <button
                    onClick={() => setMoodQuery('')}
                    type="button"
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-brand-accent-fourth hover:text-brand-accent-primary transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {isMoodOpen && (
              <div className="absolute z-50 top-full left-0 right-0 mt-1.5 p-1.5 border border-white/80 bg-white/75 backdrop-blur-xl shadow-md rounded-2xl animate-in fade-in-0 zoom-in-95 duration-150">
                <div className="max-h-36 overflow-y-auto flex flex-col gap-0.5">
                  {displayMoods.length > 0 ? (
                    displayMoods.map((mood) => (
                      <label
                        key={mood}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-brand-accent-secondary/10 active:scale-99 text-brand-accent-primary cursor-pointer transition-all duration-200"
                      >
                        <input
                          type="checkbox"
                          checked={tempMoods.includes(mood)}
                          onChange={() => handleMood(mood)}
                          className="sr-only"
                        />
                        <div
                          className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                            tempMoods.includes(mood)
                              ? 'bg-brand-accent-secondary border-brand-accent-secondary text-white shadow-xs'
                              : 'border-gray-300/80 bg-white/40 group-hover:border-gray-400'
                          }`}
                        >
                          {tempMoods.includes(mood) && (
                            <svg
                              className="w-2.5 h-2.5 stroke-[2]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium">{mood}</span>
                      </label>
                    ))
                  ) : (
                    <div className="px-3 py-3 text-xs text-brand-accent-fourth text-center">
                      Không tìm thấy mood phù hợp
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-auto pt-2.5 flex items-center justify-end gap-2 shrink-0 border-t border-white/40">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 font-medium text-brand-accent-fourth hover:text-brand-accent-primary rounded-xl hover:bg-white/50 transition-all cursor-pointer"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2 font-medium text-white bg-gray-900/90 hover:bg-black rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </>
  );
}
