import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'OBELISK — 3D Web Concept · Portfolio Demo';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #051024 0%, #0a1733 60%, #16264a 100%)',
          color: '#f0ece4',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 40%, rgba(201,168,76,0.25) 0%, transparent 60%)',
          display: 'flex',
        }} />
        <div style={{
          fontSize: 180,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#f0ece4',
          textShadow: '0 4px 30px rgba(0,0,0,.5)',
          zIndex: 1,
          display: 'flex',
        }}>
          OBELISK
        </div>
        <div style={{
          fontSize: 36,
          color: '#c9a84c',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginTop: 20,
          zIndex: 1,
          display: 'flex',
        }}>
          3D web concept · portfolio
        </div>
        <div style={{
          position: 'absolute',
          bottom: 40,
          fontSize: 24,
          color: '#8ba2c4',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          zIndex: 1,
          display: 'flex',
        }}>
          dimitrije svilenković · svilenkovic.com
        </div>
      </div>
    ),
    { ...size }
  );
}
