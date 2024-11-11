import { useCallback, useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Spinner, Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from 'reactstrap';

import styles from './Profile.module.css';

import { getFromSS, setToSS } from '../../utils/storage';

export default function Profile(props) {
    const {
        serverUri,
        appSocket,
        user,
    } = props;

    // console.log('user 2', user); // eslint-disable-line
    // const [user, setUserData] = useState(props.user);

    const [modal, setModal] = useState(false);

    const [showFirstDelModal, setShowFirstDelModal] = useState(false);
    const [showSecondDelModal, setShowSecondDelModal] = useState(false);
    const [showLastDelModal, setShowLastDelModal] = useState(false);
    const [showTgLoginModal, setShowTgLoginModal] = useState(false);

    useEffect(() => {
        const isDisclaimerShown = Boolean(getFromSS('disclaimer'));

        setModal(!isDisclaimerShown);
    }, []);

    return <>

        <div style={{
            margin: 20,
        }} >
            <div>
                <div className={styles.Line} >Логин</div>
                <div className={styles.Line} ><b>{user.login}</b></div>
            </div>
            <div>
                <div className={styles.Line} >Статус профиля</div>
                <div className={styles.Line} >
                    {
                        user.activated || user.demoActivated ?
                            <>
                                <Badge
                                    color="success"
                                >
                                    Активен{
                                        user.activateEndAt ?
                                            ` (до ${new Date(user.activateEndAt).toLocaleString('ru')})` :
                                            ''
                                    }
                                </Badge> <a href="/pricing" > { /* eslint-disable-line */}
                                    <Badge
                                        color="warning"
                                    >
                                        Продлить
                                    </Badge>
                                </a>
                            </> :
                            <a href="/pricing" > { /* eslint-disable-line */}
                                <Badge
                                    color="danger"
                                >
                                    Отключён (нажмите, чтобы подключить)
                                </Badge>
                            </a>

                    }
                </div>
            </div>

            <div>
                <div
                    className={styles.Line + ' ' + styles.DelAccButton}
                    onClick={() => {
                        setShowFirstDelModal(true);
                    }}
                >
                    Удалить профиль
                </div>
            </div>
        </div>
    </>;
}
