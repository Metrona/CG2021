import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import {
  Engine,
  Scene,
  Vector3,
  SceneLoader,
  UniversalCamera,
  HemisphericLight,
  Animation,
  PointerEventTypes,
} from "@babylonjs/core";

class App {
  // Initialization
  private _scene: Scene;
  private _canvas: HTMLCanvasElement;
  private _infoModal: HTMLDivElement;
  private _engine: Engine;

  // Create canvas
  private _getCanvas(): HTMLCanvasElement {
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    return canvas;
  }

  private _getInfoModal(): HTMLDivElement {
    const infoModal = document.getElementById("info-modal") as HTMLDivElement;
    return infoModal;
  }

  private _setInfo(title: string, body: string, link: string): void {
    this._infoModal.style.display = "flex";

    // set title
    const titleEl = document.getElementById("info-modal-title");
    titleEl.innerHTML = title;

    // set body
    const bodyEl = document.getElementById("info-modal-body");
    bodyEl.innerHTML = body;

    // set link
    const linkEl = document.getElementById(
      "info-modal-link"
    ) as HTMLAnchorElement;
    linkEl.href = link;
  }

  // Create scene
  private _createScene(canvas: HTMLCanvasElement, engine: Engine): Scene {
    // Scene setup
    const scene = new Scene(engine);
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
      let main_door_left_opened = false;
      main_door_left.isPickable = true;
      main_door_left_hinge.isPickable = true;
      let main_door_right_opened = false;
      main_door_right.isPickable = true;
      main_door_right_hinge.isPickable = true;

      // Souvenir door
      const souvenir_door_left = scene.getMeshByName("Box117");
      const souvenir_door_left_hinge = scene.getMeshByName("Box116");
      const souvenir_door_right = scene.getMeshByName("Box119");
      const souvenir_door_right_hinge = scene.getMeshByName("Box118");
      let souvenir_door_left_opened = false;
      souvenir_door_left.isPickable = true;
      souvenir_door_left_hinge.isPickable = true;
      let souvenir_door_right_opened = false;
      souvenir_door_right.isPickable = true;
      souvenir_door_right_hinge.isPickable = true;

      // Souvenir door 2
      const souvenir_door_left_2 = scene.getMeshByName("Box123");
      const souvenir_door_left_hinge_2 = scene.getMeshByName("Box122");
      const souvenir_door_right_2 = scene.getMeshByName("Box125");
      const souvenir_door_right_hinge_2 = scene.getMeshByName("Box124");
      let souvenir_door_left_opened_2 = false;
      souvenir_door_left_2.isPickable = true;
      souvenir_door_left_hinge_2.isPickable = true;
      let souvenir_door_right_opened_2 = false;
      souvenir_door_right_2.isPickable = true;
      souvenir_door_right_hinge_2.isPickable = true;

      // Fox door
      const fox_door = scene.getMeshByName("Box105");
      const fox_door_hinge = scene.getMeshByName("Box106");
      let fox_door_opened = false;
      fox_door.isPickable = true;
      fox_door_hinge.isPickable = true;

      // MUSEUM
      // Airplane
      const airplane = scene.getMeshByName("airplane");
      airplane.isPickable = true;
      // Helicopter
      const helicopter = scene.getMeshByName("helicopter");
      helicopter.isPickable = true;
      // Bus
      const bus = scene.getMeshByName("bus");
      bus.isPickable = true;
      // Boat
      const boat = scene.getMeshByName("boat");
      boat.isPickable = true;
      // Tank
      const tank = scene.getMeshByName("tank");
      tank.isPickable = true;
      // Tetrahedron
      const tetrahedron = scene.getMeshByName("tetrahedron");
      tetrahedron.isPickable = true;
      // Hexahedron
      const hexahedron = scene.getMeshByName("hexahedron");
      hexahedron.isPickable = true;
      // Octahedron
      const octahedron = scene.getMeshByName("octahedron");
      octahedron.isPickable = true;
      // Icosahedron
      const icosahedron = scene.getMeshByName("icosahedron");
      icosahedron.isPickable = true;
      // Dodecahedron
      const dodecahedron = scene.getMeshByName("dodecahedron");
      dodecahedron.isPickable = true;
      // Teapot
      const teapot = scene.getMeshByName("teapot");
      teapot.isPickable = true;

      // door animations
      //left
      const door_left_animation_open = new Animation(
        "main_door_left_open",
        "rotation.z",
        30,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      door_left_animation_open.setKeys([
        {
          frame: 0,
          value: 0,
        },
        {
          frame: 30,
          value: -(Math.PI / 2),
        },
      ]);
      const door_left_animation_close = new Animation(
        "main_door_left_close",
        "rotation.z",
        30,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      door_left_animation_close.setKeys([
        {
          frame: 0,
          value: -(Math.PI / 2),
        },
        {
          frame: 30,
          value: 0,
        },
      ]);
      //right
      const door_right_animation_open = new Animation(
        "main_door_right_open",
        "rotation.z",
        30,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      door_right_animation_open.setKeys([
        {
          frame: 0,
          value: 0,
        },
        {
          frame: 30,
          value: Math.PI / 2,
        },
      ]);
      const door_right_animation_close = new Animation(
        "main_door_right_open",
        "rotation.z",
        30,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      door_right_animation_close.setKeys([
        {
          frame: 0,
          value: Math.PI / 2,
        },
        {
          frame: 30,
          value: 0,
        },
      ]);

      // pointer
      const pointerDown = () => {
        const pickInfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickInfo.hit) {
          if (pickInfo.pickedMesh === main_door_left) {
            if (!main_door_left_opened) {
              scene.beginDirectAnimation(
                main_door_left,
                [door_left_animation_open],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                main_door_left_hinge,
                [door_left_animation_open],
                0,
                30,
                false
              );
            } else {
              scene.beginDirectAnimation(
                main_door_left,
                [door_left_animation_close],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                main_door_left_hinge,
                [door_left_animation_close],
                0,
                30,
                false
              );
            }
            main_door_left_opened = !main_door_left_opened;
          } else if (pickInfo.pickedMesh === main_door_right) {
            if (!main_door_right_opened) {
              scene.beginDirectAnimation(
                main_door_right,
                [door_right_animation_open],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                main_door_right_hinge,
                [door_right_animation_open],
                0,
                30,
                false
              );
            } else {
              scene.beginDirectAnimation(
                main_door_right,
                [door_right_animation_close],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                main_door_right_hinge,
                [door_right_animation_close],
                0,
                30,
                false
              );
            }
            main_door_right_opened = !main_door_right_opened;
          } else if (pickInfo.pickedMesh === souvenir_door_left) {
            if (!souvenir_door_left_opened) {
              scene.beginDirectAnimation(
                souvenir_door_left,
                [door_left_animation_open],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                souvenir_door_left_hinge,
                [door_left_animation_open],
                0,
                30,
                false
              );
            } else {
              scene.beginDirectAnimation(
                souvenir_door_left,
                [door_left_animation_close],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                souvenir_door_left_hinge,
                [door_left_animation_close],
                0,
                30,
                false
              );
            }
            souvenir_door_left_opened = !souvenir_door_left_opened;
          } else if (pickInfo.pickedMesh === souvenir_door_right) {
            if (!souvenir_door_right_opened) {
              scene.beginDirectAnimation(
                souvenir_door_right,
                [door_right_animation_open],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                souvenir_door_right_hinge,
                [door_right_animation_open],
                0,
                30,
                false
              );
            } else {
              scene.beginDirectAnimation(
                souvenir_door_right,
                [door_right_animation_close],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                souvenir_door_right_hinge,
                [door_right_animation_close],
                0,
                30,
                false
              );
            }
            souvenir_door_right_opened = !souvenir_door_right_opened;
          } else if (pickInfo.pickedMesh === souvenir_door_left_2) {
            if (!souvenir_door_left_opened_2) {
              scene.beginDirectAnimation(
                souvenir_door_left_2,
                [door_left_animation_open],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                souvenir_door_left_hinge_2,
                [door_left_animation_open],
                0,
                30,
                false
              );
            } else {
              scene.beginDirectAnimation(
                souvenir_door_left_2,
                [door_left_animation_close],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                souvenir_door_left_hinge_2,
                [door_left_animation_close],
                0,
                30,
                false
              );
            }
            souvenir_door_left_opened_2 = !souvenir_door_left_opened_2;
          } else if (pickInfo.pickedMesh === souvenir_door_right_2) {
            if (!souvenir_door_right_opened_2) {
              scene.beginDirectAnimation(
                souvenir_door_right_2,
                [door_right_animation_open],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                souvenir_door_right_hinge_2,
                [door_right_animation_open],
                0,
                30,
                false
              );
            } else {
              scene.beginDirectAnimation(
                souvenir_door_right_2,
                [door_right_animation_close],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                souvenir_door_right_hinge_2,
                [door_right_animation_close],
                0,
                30,
                false
              );
            }
            souvenir_door_right_opened_2 = !souvenir_door_right_opened_2;
          } else if (pickInfo.pickedMesh === fox_door) {
            if (!fox_door_opened) {
              scene.beginDirectAnimation(
                fox_door,
                [door_right_animation_open],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                fox_door_hinge,
                [door_right_animation_open],
                0,
                30,
                false
              );
            } else {
              scene.beginDirectAnimation(
                fox_door,
                [door_right_animation_close],
                0,
                30,
                false
              );
              scene.beginDirectAnimation(
                fox_door_hinge,
                [door_right_animation_close],
                0,
                30,
                false
              );
            }
            fox_door_opened = !fox_door_opened;
          } else if (pickInfo.pickedMesh === airplane) {
            this._setInfo(
              "Airplane",
              "An airplane or aeroplane (informally plane) is a fixed-wing aircraft that is propelled forward by thrust from a jet engine, propeller, or rocket engine. Airplanes come in a variety of sizes, shapes, and wing configurations.",
              "https://en.wikipedia.org/wiki/Airplane"
            );
          } else if (pickInfo.pickedMesh === helicopter) {
            this._setInfo(
              "Helicopter",
              "A helicopter is a type of rotorcraft in which lift and thrust are supplied by horizontally spinning rotors.",
              "https://en.wikipedia.org/wiki/Helicopter"
            );
          } else if (pickInfo.pickedMesh === bus) {
            this._setInfo(
              "Bus",
              "A bus (contracted from omnibus, with variants multibus, motorbus, autobus, etc.) is a public transport road vehicle designed to carry significantly more passengers than the average cars or vans.",
              "https://en.wikipedia.org/wiki/Bus"
            );
          } else if (pickInfo.pickedMesh === boat) {
            this._setInfo(
              "Motorboat",
              "A motorboat, speedboat or powerboat is a boat that is exclusively powered by an engine.",
              "https://en.wikipedia.org/wiki/Motorboat"
            );
          } else if (pickInfo.pickedMesh === tank) {
            this._setInfo(
              "Tank",
              "A tank is an armored fighting vehicle intended as a primary offensive weapon in front-line ground combat.",
              "https://en.wikipedia.org/wiki/Tank"
            );
          } else if (pickInfo.pickedMesh === tetrahedron) {
            this._setInfo(
              "Tetrahedron",
              "In geometry, a tetrahedron (plural: tetrahedra or tetrahedrons), also known as a triangular pyramid, is a polyhedron composed of four triangular faces, six straight edges, and four vertex corners.",
              "https://en.wikipedia.org/wiki/Tetrahedron"
            );
          } else if (pickInfo.pickedMesh === hexahedron) {
            this._setInfo(
              "Hexahedron",
              "A hexahedron (plural: hexahedra) is any polyhedron with six faces. A cube, for example, is a regular hexahedron with all its faces square, and three squares around each vertex.",
              "https://en.wikipedia.org/wiki/Hexahedron"
            );
          } else if (pickInfo.pickedMesh === octahedron) {
            this._setInfo(
              "Octahedron",
              "In geometry, an octahedron (plural: octahedra, octahedrons) is a polyhedron with eight faces, twelve edges, and six vertices.",
              "https://en.wikipedia.org/wiki/Octahedron"
            );
          } else if (pickInfo.pickedMesh === icosahedron) {
            this._setInfo(
              "Icosahedron",
              "In geometry, an icosahedron (/ˌaɪkɒsəˈhiːdrən, -kə-, -koʊ-/ or /aɪˌkɒsəˈhiːdrən/) is a polyhedron with 20 faces.",
              "https://en.wikipedia.org/wiki/Icosahedron"
            );
          } else if (pickInfo.pickedMesh === dodecahedron) {
            this._setInfo(
              "Dodecahedron",
              'In geometry, a dodecahedron (Greek δωδεκάεδρον, from δώδεκα dōdeka "twelve" + ἕδρα hédra "base", "seat" or "face") or duodecahedron is any polyhedron with twelve flat faces.',
              "https://en.wikipedia.org/wiki/Dodecahedron"
            );
          } else if (pickInfo.pickedMesh === teapot) {
            this._setInfo(
              "Utah Teapot",
              "The Utah teapot, or the Newell teapot, is a 3D test model that has become a standard reference object and an in-joke within the computer graphics community.",
              "https://en.wikipedia.org/wiki/Utah_teapot"
            );
          }
        }
      };

      scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
          case PointerEventTypes.POINTERDOWN:
            pointerDown();
            break;
        }
      });
    });

    return scene;
  }

  // Constructor
  constructor() {
    // Create canvas
    this._canvas = this._getCanvas();

    this._infoModal = this._getInfoModal();
    const infoCloseBtn = document.getElementById("info-close-btn");
    infoCloseBtn.addEventListener("click", () => {
      this._infoModal.style.display = "none";
    });

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
