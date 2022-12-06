import Modal from 'react-bootstrap/Modal';

import { useLauncher } from '~/contexts/launcher';

function Icon({ type }: any) {
  if (type === 'search') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="12"
        height="12"
      >
        <path
          fillRule="evenodd"
          d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
        ></path>
      </svg>
    );
  } else if (type === 'filter') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="12"
        height="12"
      >
        <path
          fillRule="evenodd"
          d="M.75 3a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H.75zM3 7.75A.75.75 0 013.75 7h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 013 7.75zm3 4a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z"
        ></path>
      </svg>
    );
  }

  return <></>;
}

export default function Launcher() {
  const { visible, hide, breadcrumbs, options } = useLauncher() as any;

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
          {breadcrumbs?.length > 0 && (
            <div className="launcher-breadcrumbs">
              {breadcrumbs.map((crumb: string, i: number) => {
                if (i === 0 || i === breadcrumbs?.length) {
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

          {options?.length > 0 && (
            <>
              <div className="divider"></div>
              <div className="launcher-options">
                {options.map((option: any) => (
                  <div key={option.control} className="launcher-option">
                    <Icon type={option.icon} />
                    {option.text}
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
