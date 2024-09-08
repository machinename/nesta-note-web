'use client';

import { TextField } from '@mui/material';
import styles from "./note.module.css"

export default function NoteFormTitle({
    handleTitleChange,
    initialMode,
    isEditMode,
    isNestedMode,
    isViewMode,
    nestedTitle,
    setIsEditMode,
    title,
    toggleEditModeTrue
}) {
    const placeholderText = isNestedMode ? 'Nested - Title...' : 'Title...';
    const readOnlyMode = initialMode === 'read' && !isViewMode;

    const handleFocus = () => {
        if (!(readOnlyMode || isNestedMode)) {
            setIsEditMode(true);
        }
    };

    const handleClick = () => {
        if (readOnlyMode) {
            toggleEditModeTrue();
        }
    };

    return (
        <>
            {(isEditMode || title.length > 0) && (
                <div className={styles.titleContainer}>
                    <TextField
                        inputProps={{
                            autoComplete: 'off',
                            readOnly: readOnlyMode,
                            style: { fontSize: 20 },
                        }}
                        className={styles.contentTextField}
                        multiline
                        onChange={handleTitleChange}
                        onClick={handleClick}
                        onFocus={handleFocus}
                        placeholder={placeholderText}
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { border: 'none' },
                                '&:hover fieldset': { border: 'none' },
                                '&.Mui-focused fieldset': { border: 'none' },
                            },
                        }}
                        value={isNestedMode ? nestedTitle : title}
                    />
                </div>
            )}
        </>
    );
}
