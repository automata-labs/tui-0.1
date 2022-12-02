import Modal from 'react-bootstrap/Modal';

import { useLauncher } from '~/contexts/launcher';

export default function Launcher() {
  const { visible, hide, breadcrumbs } = useLauncher() as any;

  return (
    <>
      <Modal
        className="modal"
        backdrop
        animation={false}
        show={visible}
        onHide={() => hide()}
      >
        <div className="launcher">
          <div className="launcher-breadcrumbs">
            {breadcrumbs.map((crumb: any, i: number) => {
              if (i === 0 || i === breadcrumbs.length) {
                return <div className="launcher-crumb" key={i}>{crumb?.text}</div>;
              } else {
                return (
                  <>
                    <div className="launcher-crumb">{crumb?.text}</div>
                    <div>{'>'}</div>
                  </>
                );
              }
            })}
          </div>
          <input
            className="input launcher-search"
            placeholder="> Type in commend or search..."
          />
        </div>
      </Modal>
    </>
  );
}
