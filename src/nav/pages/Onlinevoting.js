import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Onlinevoting.css";

function Onlinevoting() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedType, setSelectedType] = useState("image_poll");
  const [pollCreated, setPollCreated] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [answerOptions, setAnswerOptions] = useState([
    { label: "", image: null, description: "", preview: null },
  ]);

  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleNavigateCreatedPoll = () => navigate("/createdpoll");
  const handleNavigateResult = () => navigate("/result");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);

    // ✅ Reset incompatible data when switching types
    setAnswerOptions([{ label: "", image: null, description: "", preview: null }]);
    setPollCreated(false);
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index][field] = value;
    setAnswerOptions(updatedOptions);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedOptions = [...answerOptions];

    // ✅ Revoke old preview if exists
    if (updatedOptions[index].preview) {
      URL.revokeObjectURL(updatedOptions[index].preview);
    }

    updatedOptions[index].image = file;
    updatedOptions[index].preview = URL.createObjectURL(file);

    setAnswerOptions(updatedOptions);
  };

  const addOption = () => {
    setAnswerOptions([
      ...answerOptions,
      { label: "", image: null, description: "", preview: null },
    ]);
  };

  const removeOption = (index) => {
    // ✅ Prevent removing last option
    if (answerOptions.length === 1) return;

    const updatedOptions = [...answerOptions];

    // ✅ Cleanup preview memory
    if (updatedOptions[index].preview) {
      URL.revokeObjectURL(updatedOptions[index].preview);
    }

    updatedOptions.splice(index, 1);
    setAnswerOptions(updatedOptions);
  };

  const createPoll = () => {
    if (isCreating) return;

    if (!title.trim()) {
      setTitleError(true);
      return;
    }

    const validOptions = answerOptions.filter(
      (option) => option.label.trim() !== ""
    );

    if (!validOptions.length) return;

    try {
      setIsCreating(true);

      console.log({
        title: title.trim(),
        selectedType,
        answerOptions: validOptions,
      });

      setFilteredOptions(validOptions);
      setPollCreated(true);

    } finally {
      setIsCreating(false);
    }
  };

  // ✅ Cleanup ALL previews on component unmount
  useEffect(() => {
    return () => {
      answerOptions.forEach(option => {
        if (option.preview) URL.revokeObjectURL(option.preview);
      });
    };
  }, []);

  return (
    <div className="full">

      <div className="ct-headline7">Create Poll</div>

      <form className="tab">

        <div>
          <label className="label">Title</label>

          <input
            type="text"
            placeholder="Type your question here"
            className={`input large ${titleError ? "is-danger" : ""}`}
            value={title}
            onChange={handleTitleChange}
          />

          {titleError && (
            <p className="text-red-600">Please enter a poll title.</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowDescription(!showDescription)}
          className="ad"
        >
          Add description or Text
        </button>

        {showDescription && (
          <textarea className="textarea large" rows="3" />
        )}

        <div>
          <label className="label">Voting type</label>

          <select
            className="input large"
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <option value="image_poll">Image poll</option>
            <option value="multiple_choice">Multiple choice</option>
          </select>
        </div>

        {selectedType === "image_poll" && (
          <div>
            <label className="label">Answer Options</label>

            {answerOptions.map((option, index) => (
              <div key={index} className="mt-1 flex items-center space-x-2">

                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  className="input"
                  value={option.label}
                  onChange={(e) =>
                    handleOptionChange(index, "label", e.target.value)
                  }
                />

                <input
                  id={`option-image-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e)}
                  className="hidden"
                />

                <label htmlFor={`option-image-${index}`} className="ad">
                  Image
                </label>

                {option.preview && (
                  <img
                    src={option.preview}
                    alt="preview"
                    className="option-image"
                  />
                )}

                <input
                  type="text"
                  placeholder="Description"
                  className="input"
                  value={option.description}
                  onChange={(e) =>
                    handleOptionChange(index, "description", e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="button1"
                >
                  Remove
                </button>
              </div>
            ))}

            <button type="button" onClick={addOption} className="button">
              Add Option
            </button>
          </div>
        )}

        {selectedType === "multiple_choice" && (
          <div>
            <label className="label">Answer Options</label>

            {answerOptions.map((option, index) => (
              <div key={index} className="mt-1 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  className="input"
                  value={option.label}
                  onChange={(e) =>
                    handleOptionChange(index, "label", e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="buttonm"
                >
                  Remove
                </button>
              </div>
            ))}

            <button type="button" onClick={addOption} className="button">
              Add Option
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={createPoll}
          className="create"
          disabled={isCreating}
        >
          {isCreating ? "Creating Poll..." : "Create Poll"}
        </button>
      </form>

      {pollCreated && (
        <table className="poll-table">
          <tbody>
            {filteredOptions.map((option, index) => (
              <tr key={index}>
                <td>{option.label}</td>
                <td>{option.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="poll-actions-container">
        <button onClick={handleNavigateCreatedPoll} className="crep">
          Created Poll
        </button>

        <button onClick={handleNavigateResult} className="crep1">
          Result
        </button>
      </div>

    </div>
  );
}

export default Onlinevoting;