'use client'

import { useEffect, useRef } from 'react';
import { IconButton } from '@mui/material';
import styles from "./Information.module.css";
import { Close } from '@mui/icons-material';
import { useAppContext } from '../providers/AppProvider';

export default function Information() {
    const { infoContent, info, infoTitle, setInfoContent, setInfo, setInfoTitle } = useAppContext();

    const infoItems = [
        { show: info.length > 0, info: info, type: 'general' },
        { show: infoTitle.length > 0, info: infoTitle, type: 'title' },
        { show: infoContent.length > 0, info: infoContent, type: 'content' }
    ];

    const informationRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (informationRef.current && !informationRef.current.contains(event.target)) {
                setInfoContent('');
                setInfo('');
                setInfoTitle('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setInfoContent, setInfo, setInfoTitle]);

    return (
        <>
            {(infoContent.length > 0 || info.length > 0 || infoTitle.length > 0) && (
                <div className={styles.container} ref={informationRef}>
                    {infoItems.map((item, index) =>
                        item.show && (
                            <div key={index} className={styles.information}>
                                <p>{item.info}</p>
                                {
                                    item.type === "general" && (
                                        <IconButton onClick={() => setInfo('')}>
                                            <Close style={{
                                                color: 'white'
                                            }} color='white'/>
                                        </IconButton>
                                    )
                                }
                            </div>
                        )
                    )}
                </div>
            )}
        </>
    );
}