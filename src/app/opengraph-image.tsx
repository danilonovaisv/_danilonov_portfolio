import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'Danilo Novais | Creative Developer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#06071f',
        color: 'white',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Decorative Gradient Blob */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, #0057FF 0%, transparent 70%)',
            opacity: 0.4,
            filter: 'blur(80px)',
          }}
        />

        <h1
          style={{
            fontSize: 82,
            fontWeight: 800,
            background: 'linear-gradient(to bottom right, #ffffff, #888888)',
            backgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '-2px',
            margin: 0,
            padding: 0,
            textAlign: 'center',
          }}
        >
          Danilo Novais
        </h1>
        <p
          style={{
            fontSize: 32,
            color: '#0057FF',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginTop: 20,
          }}
        >
          Creative Developer
        </p>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
