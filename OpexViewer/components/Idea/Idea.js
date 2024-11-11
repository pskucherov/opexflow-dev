import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import styles from './Idea.module.css';
import { Button, Form, Input, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';

import { useTranslation } from 'next-i18next';

// export const IdeaContext = createContext();

export default function Idea(props) {
    const {
        ideaRef,
        tgId = '',
        login = '',
        isDarkMode,
    } = props;

    const { t } = useTranslation('common');

    const [divPosHover, setDivHover] = useState(false);
    const [modalOpened, onModalOpen] = useState(false);

    const offset = Boolean(modalOpened || divPosHover);
    const [inProgress, setInProgress] = useState(false);
    const [isSentSuccess, setIsSentSuccess] = useState(false);

    const contactsRef = useRef();
    const textRef = useRef();

    const closeModal = useCallback(() => {
        setInProgress(false);
        setIsSentSuccess(false);
        onModalOpen(false);
    }, [onModalOpen, setInProgress, setIsSentSuccess]);

    const toggle = useCallback(() => {
        const div = document.getElementById('__next');

        if (modalOpened) {
            div && (div.style.overflow = '');

            return closeModal();
        }

        div && (div.style.overflow = 'hidden');

        onModalOpen(true);
    }, [modalOpened, onModalOpen, closeModal]);

    return (
        <>
            <div
                className={styles.IdeaButton}
                style={{
                    bottom: 20 - offset,
                    left: 20 - offset,
                    position: 'fixed',
                    margin: 0,
                    filter: isDarkMode ? 'invert(1)' : undefined,
                }}
                onClick={toggle}
                onMouseEnter={() => {
                    setDivHover(true);
                }}
                onMouseLeave={() => {
                    setDivHover(false);
                }}
                ref={ideaRef}
            >
                <Image
                    src="/opexidea.png"
                    alt={t('feedbackform.message')}
                    width={offset ? 62 : 54}
                    height={offset ? 62 : 54}
                />
            </div>
            <div className={styles.RoboIdea}>
                <style>{`
                    .wrapClassName .modal {
                        top: auto;
                        height: auto;
                        bottom: 100px;
                    }
                    .wrapClassName .modal .modal-dialog {
                        margin: 0;
                    }
                `}</style>
                <Modal
                    isOpen={modalOpened}
                    toggle={toggle}
                    fullscreen={false}
                    centered={false}
                    backdrop={true}
                    scrollable={true}
                    modalTransition={
                        {
                            mountOnEnter: false,
                            timeout: 0,
                        }
                    }
                    backdropTransition={
                        {
                            mountOnEnter: false,
                            timeout: 0,
                        }
                    }
                    container={'.' + styles.RoboIdea}
                    modalClassName={styles.RoboIdea}
                    wrapClassName={'wrapClassName'}
                    backdropClassName={'backdropClassName'}
                    contentClassName={'contentClassName'}
                >
                    <ModalHeader toggle={toggle}>
                        {t('feedbackform.title')}
                    </ModalHeader>
                    <ModalBody>
                        {isSentSuccess ? <><div style={{
                            margin: '50px auto',
                            textAlign: 'center',
                            fontSize: '18px',
                            fontWeight: 'bold',
                        }}>{t('feedbackform.sent')}</div></> :
                            <>
                                <div>
                                    <Input
                                        placeholder={t('feedbackform.yourcontacts')}
                                        name="contact"
                                        innerRef={contactsRef}
                                    />
                                </div><br></br>
                                <div>
                                    <Input
                                        name="message"
                                        type="textarea"
                                        rows="5"
                                        innerRef={textRef}
                                        placeholder={t('feedbackform.message')}
                                    />
                                </div>
                            </>
                        }
                    </ModalBody>
                    <ModalFooter>
                        {isSentSuccess ? '' :
                            inProgress ? <Spinner color="primary" /> : <Button
                                color="primary"
                            >
                                {t('feedbackform.send')}
                            </Button>
                        }
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}
