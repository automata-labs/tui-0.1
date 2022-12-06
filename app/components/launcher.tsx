import Modal from 'react-bootstrap/Modal';

import { useLauncher } from '~/contexts/launcher';

export default function Launcher() {
  const { visible, hide, breadcrumbs, controls } = useLauncher() as any;

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
          {breadcrumbs.length > 0 && (
            <div className="launcher-breadcrumbs">
              {breadcrumbs.map((crumb: string, i: number) => {
                if (i === 0 || i === breadcrumbs.length) {
                  return (
                    <div className="launcher-crumb" key={i}>
                      {crumb}
                    </div>
                  );
                } else {
                  return (
                    <>
                      <div className="launcher-crumb">{crumb}</div>
                      <div>{'>'}</div>
                    </>
                  );
                }
              })}
            </div>
          )}
          <input
            autoFocus
            className="input launcher-search"
            placeholder="> Type in commend or search..."
          />

          {controls.length > 0 && (
            <>
              <div className="divider"></div>
              <div className="launcher-controls">
                {controls.map((control: any) => (
                  <div key={control.control} className="launcher-control">
                    <svg
                      className="launcher-control-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="16"
                      height="16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
                      ></path>
                    </svg>

                    {control.text}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
