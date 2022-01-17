import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import {
  Engine,
  Scene,
  Vector3,
  SceneLoader,
  UniversalCamera,
  HemisphericLight,
  PointLight,
  FreeCamera,
  Animation,
  // PBRMetallicRoughnessMaterial,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

class App {
  // Initialization
  private _scene: Scene;
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;

  // Create canvas
  private _createCanvas(): HTMLCanvasElement {
    var canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "canvas";
    document.body.append(canvas); // Add the canvas into the HTML body
    return canvas;
  }

  // Create scene
  private _createScene(canvas: HTMLCanvasElement, engine: Engine): Scene {
    // Scene setup
    const scene = new Scene(engine);
    // scene.createDefaultEnvironment({
    //   createSkybox: true,
    //   skyboxSize: 1000,
    // });
    scene.collisionsEnabled = true;

    // Camera setup
    const camera = new UniversalCamera(
      "main_camera",
      new Vector3(-175.0, 25.0, -45.0),
      scene
    );
    camera.rotation.y = 1.57;
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.ellipsoid = new Vector3(5.0, 12.5, 5.0);
    // camera.speed = 0.2;
    // Add WASD inputs
    camera.keysUp.push(87); // W
    camera.keysDown.push(83); // S
    camera.keysLeft.push(65); // A
    camera.keysRight.push(68); // D
    camera.attachControl(canvas, true);

    // Lightning setup
    const light1 = new HemisphericLight(
      "light1",
      new Vector3(0, 110, 0),
      scene
    );
    // light1.intensity = 100.0;

    // Load the scene
    SceneLoader.AppendAsync(
      "/assets/models/museum_with_roof/",
      "model.babylon",
      scene
    ).then((scene) => {
      scene.activeCamera = camera;

      // Add collision
      scene.meshes.forEach((mesh) => {
        // ignore certain meshes
        if (
          mesh.name === "Front_Window_Frame" ||
          mesh.name === "Fox_Window_Frame" ||
          mesh.name === "Souvenir_Frame"
        ) {
          return;
        }
        mesh.checkCollisions = true;
      });

      // Invisible wall
      const wall1 = scene.getMeshByName("invisible_wall_1");
      wall1.checkCollisions = true;
      wall1.isVisible = false;
      const wall2 = scene.getMeshByName("invisible_wall_2");
      wall2.checkCollisions = true;
      wall2.isVisible = false;
      const wall3 = scene.getMeshByName("invisible_wall_3");
      wall3.checkCollisions = true;
      wall3.isVisible = false;

      // Edit glass material
      const material = scene.getMaterialByName("glass");
      material.alpha = 0.25;
      material.transparencyMode = 2;
      material.backFaceCulling = false;
      material.freeze();

      // Door meshes
      // Main door
      const main_door_left = scene.getMeshByName("Box111");
      const main_door_left_hinge = scene.getMeshByName("Box112");
      const main_door_right = scene.getMeshByName("Box113");
      const main_door_right_hinge = scene.getMeshByName("Box114");
      // Souvenir door
      const souvenir_door_left = scene.getMeshByName("Box117");
      const souvenir_door_left_hinge = scene.getMeshByName("Box116");
      const souvenir_door_right = scene.getMeshByName("Box119");
      const souvenir_door_right_hinge = scene.getMeshByName("Box118");
      // Souvenir door 2
      const souvenir_door_left_2 = scene.getMeshByName("Box123");
      const souvenir_door_left_hinge_2 = scene.getMeshByName("Box122");
      const souvenir_door_right_2 = scene.getMeshByName("Box125");
      const souvenir_door_right_hinge_2 = scene.getMeshByName("Box124");
      // Fox door
      const fox_door = scene.getMeshByName("Box105");
      const fox_door_hinge = scene.getMeshByName("Box106");

      // Door triggers
      const main_door_trigger = scene.getMeshByName("trigger_box_main_door");
      main_door_trigger.checkCollisions = true;
      const souvenir_door_trigger = scene.getMeshByName(
        "trigger_box_souvenir_door"
      );
      souvenir_door_trigger.checkCollisions = true;
      const souvenir_door_trigger_2 = scene.getMeshByName(
        "trigger_box_souvenir_door_2"
      );
      souvenir_door_trigger_2.checkCollisions = true;
      const fox_door_trigger = scene.getMeshByName("trigger_box_fox_door");
      fox_door_trigger.checkCollisions = true;

      // door animations
      const door_left_animation = new Animation(
        "main_door_left",
        "rotation.z",
        30,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      door_left_animation.setKeys([
        {
          frame: 0,
          value: 0,
        },
        {
          frame: 30,
          value: -(Math.PI / 2),
        },
      ]);
      const door_right_animation = new Animation(
        "main_door_right",
        "rotation.z",
        30,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      door_right_animation.setKeys([
        {
          frame: 0,
          value: 0,
        },
        {
          frame: 30,
          value: Math.PI / 2,
        },
      ]);

      (scene.activeCamera as FreeCamera).onCollide = (collidedMesh) => {
        if (collidedMesh === main_door_trigger) {
          // Turn off collision
          main_door_trigger.checkCollisions = false;

          // Open the door
          // left
          scene.beginDirectAnimation(
            main_door_left,
            [door_left_animation],
            0,
            30,
            false
          );
          scene.beginDirectAnimation(
            main_door_left_hinge,
            [door_left_animation],
            0,
            30,
            false
          );
          // right
          scene.beginDirectAnimation(
            main_door_right,
            [door_right_animation],
            0,
            30,
            false
          );
          scene.beginDirectAnimation(
            main_door_right_hinge,
            [door_right_animation],
            0,
            30,
            false
          );
        } else if (collidedMesh === souvenir_door_trigger) {
          // Turn off collision
          souvenir_door_trigger.checkCollisions = false;

          // Open the door
          // left
          scene.beginDirectAnimation(
            souvenir_door_left,
            [door_left_animation],
            0,
            30,
            false
          );
          scene.beginDirectAnimation(
            souvenir_door_left_hinge,
            [door_left_animation],
            0,
            30,
            false
          );
          // right
          scene.beginDirectAnimation(
            souvenir_door_right,
            [door_right_animation],
            0,
            30,
            false
          );
          scene.beginDirectAnimation(
            souvenir_door_right_hinge,
            [door_right_animation],
            0,
            30,
            false
          );
        } else if (collidedMesh === souvenir_door_trigger_2) {
          // Turn off collision
          souvenir_door_trigger_2.checkCollisions = false;

          // Open the door
          // left
          scene.beginDirectAnimation(
            souvenir_door_left_2,
            [door_left_animation],
            0,
            30,
            false
          );
          scene.beginDirectAnimation(
            souvenir_door_left_hinge_2,
            [door_left_animation],
            0,
            30,
            false
          );
          // right
          scene.beginDirectAnimation(
            souvenir_door_right_2,
            [door_right_animation],
            0,
            30,
            false
          );
          scene.beginDirectAnimation(
            souvenir_door_right_hinge_2,
            [door_right_animation],
            0,
            30,
            false
          );
        } else if (collidedMesh === fox_door_trigger) {
          // Turn off collision
          fox_door_trigger.checkCollisions = false;

          // Open the door
          scene.beginDirectAnimation(
            fox_door,
            [door_right_animation],
            0,
            30,
            false
          );
          scene.beginDirectAnimation(
            fox_door_hinge,
            [door_right_animation],
            0,
            30,
            false
          );
        }
      };
    });

    return scene;
  }

  // Constructor
  constructor() {
    // Create canvas
    this._canvas = this._createCanvas();

    // Init babylon scene and engine
    this._engine = new Engine(this._canvas, true);
    this._scene = this._createScene(this._canvas, this._engine);

    // Hide/show the Inspector
    window.addEventListener("keydown", (ev) => {
      // Ctrl+Alt+Shift+I
      if (ev.ctrlKey && ev.altKey && ev.shiftKey && ev.key === "I") {
        if (this._scene.debugLayer.isVisible()) {
          this._scene.debugLayer.hide();
        } else {
          this._scene.debugLayer.show();
        }
      }
    });

    // Run the main render loop
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });
  }
}

// Entry point
new App();
