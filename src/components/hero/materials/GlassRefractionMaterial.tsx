'use client';

import * as React from 'react';
import * as THREE from 'three';
import {
  MeshRefractionMaterial,
  MeshTransmissionMaterial,
} from '@react-three/drei';

type TransmissionProps = React.ComponentProps<
  typeof MeshTransmissionMaterial
> & {
  variant: 'transmission';
};

type RefractionProps = React.ComponentProps<typeof MeshRefractionMaterial> & {
  variant: 'refraction';
  envMap: THREE.Texture | THREE.CubeTexture;
};

export type GlassRefractionMaterialProps = TransmissionProps | RefractionProps;

const GlassRefractionMaterial = React.forwardRef<
  any,
  GlassRefractionMaterialProps
>(function GlassRefractionMaterial(props, ref) {
  if (props.variant === 'refraction') {
    // eslint-disable-next-line no-unused-vars
    const { variant, ...rest } = props;
    return <MeshRefractionMaterial ref={ref as any} {...rest} />;
  }

  // eslint-disable-next-line no-unused-vars
  const { variant, ...rest } = props;
  return <MeshTransmissionMaterial ref={ref as any} {...rest} />;
});

export default GlassRefractionMaterial;
