/* eslint-disable react/jsx-closing-bracket-location */
import * as React from 'react';
import { Modal } from 'antd';

interface InfoModalProps {
    visible: boolean;
    closeModal: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, closeModal }) => {
    return (
        <Modal
            title="Qu'est ce que le probleme d'affectation"
            visible={visible}
            footer={null}
            onOk={closeModal}
            onCancel={closeModal}
        >
            <p>
                Le probleme d&apos;affectation consiste a affecter n ouvriers a n postes de travail
                de maniere que tous ouvriers aient chacun un poste et un seul et de telle sorte que
                la valeur totale des affectations soit optimale (minimal si il s&apos;agit de cout
                ou de depense et maximale si il s&apos;agit de profits)
            </p>
        </Modal>
    );
};

export default InfoModal;
