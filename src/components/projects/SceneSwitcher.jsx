import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  MarsRoverScene,
  SatelliteScreenScene,
  FloatingAstronautScene,
  SpaceshipCockpitScene,
  CyberDroneScene,
  SentientAiCompanionScene
} from './scenes';

/**
 * SceneSwitcher: Dynamically selects the 3D space environment based on
 * the user's active cosmic theme (currentTheme).
 * 
 * Every project can be viewed in any chosen theme.
 * All screens maintain the standardized 2.35 x 1.32 geometry and video textures.
 * 
 * 1. 'orbital_sunrise' -> SpaceshipCockpitScene (Spaceship Cockpit & Flight Bridge)
 * 2. 'earth_orbit'     -> SatelliteScreenScene (Orbital Communications Satellite)
 * 3. 'aurora_orbit'    -> CyberDroneScene (Autonomous Cyber AI Recon Drone with ion thrusters)
 * 4. 'moon_earthrise'  -> FloatingAstronautScene (Spacewalking Astronaut holding cyber tablet)
 * 5. 'night_earth'     -> SentientAiCompanionScene (Levitating Robotic AI Companion Droid)
 * 6. 'mars_orbit'      -> MarsRoverScene (Cyber Space Rover Explorer)
 */
export default function SceneSwitcher({
  activeIndex,
  texture,
  isReady,
  prefersReducedMotion = false,
  isLowEnd = false
}) {
  const transitionGroupRef = useRef();

  useFrame((_, delta) => {
    if (transitionGroupRef.current) {
      // Smooth scale and rotation damping on scene transition
      transitionGroupRef.current.scale.x = THREE.MathUtils.damp(
        transitionGroupRef.current.scale.x,
        1.0,
        10,
        delta
      );
      transitionGroupRef.current.scale.y = THREE.MathUtils.damp(
        transitionGroupRef.current.scale.y,
        1.0,
        10,
        delta
      );
      transitionGroupRef.current.scale.z = THREE.MathUtils.damp(
        transitionGroupRef.current.scale.z,
        1.0,
        10,
        delta
      );
    }
  });

  const renderScene = () => {
    switch (activeIndex) {
      case 0:
        return (
          <MarsRoverScene
            texture={texture}
            isReady={isReady}
            prefersReducedMotion={prefersReducedMotion}
            isLowEnd={isLowEnd}
          />
        );
      case 1:
        return (
          <SatelliteScreenScene
            texture={texture}
            isReady={isReady}
            prefersReducedMotion={prefersReducedMotion}
            isLowEnd={isLowEnd}
          />
        );
      case 2:
        return (
          <FloatingAstronautScene
            texture={texture}
            isReady={isReady}
            prefersReducedMotion={prefersReducedMotion}
            isLowEnd={isLowEnd}
          />
        );
      case 3:
        return (
          <SpaceshipCockpitScene
            texture={texture}
            isReady={isReady}
            prefersReducedMotion={prefersReducedMotion}
            isLowEnd={isLowEnd}
          />
        );
      case 4:
        return (
          <CyberDroneScene
            texture={texture}
            isReady={isReady}
            prefersReducedMotion={prefersReducedMotion}
            isLowEnd={isLowEnd}
          />
        );
      case 5:
        return (
          <SentientAiCompanionScene
            texture={texture}
            isReady={isReady}
            prefersReducedMotion={prefersReducedMotion}
            isLowEnd={isLowEnd}
          />
        );
      default:
        return (
          <MarsRoverScene
            texture={texture}
            isReady={isReady}
            prefersReducedMotion={prefersReducedMotion}
            isLowEnd={isLowEnd}
          />
        );
    }
  };

  return (
    <group ref={transitionGroupRef} position={[0, 0.35, 0]}>
      {renderScene()}
    </group>
  );
}
