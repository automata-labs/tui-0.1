import Spinner from '~/components/spinner';

export default function Spinners() {
  return (
    <div style={{ padding: 40, display: 'flex', gridGap: 20 }}>
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Spinner kind='line' />
      </div>
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Spinner kind='dotted' />
      </div>
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Spinner kind='simple-dots-scrolling' />
      </div>
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Spinner kind='star' />
      </div>
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Spinner kind='bouncingBar' />
      </div>
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Spinner kind='grenade' />
      </div>
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Spinner kind='longDottedFrames' />
      </div>
    </div>
  );
}
