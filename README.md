# GreenHub | Digital Gateway

> The digital component of a hybrid physical/digital ecosystem — a custom 3D-printed desk nameplate paired with a dynamic QR code routing layer.

Originally built and transferred as a custom birthday gift, this repository serves as the frontend destination for the physical "Emre Green" desk nameplate. 

## 🏗️ System Architecture

Embedding a QR code permanently into 3D-printed plastic presents a unique engineering challenge: the physical code cannot be updated, but the digital destination inevitably will change over time. 

To solve this, the system uses a **Gateway Routing Pattern**:

```text
[ Physical Nameplate ]  →  [ Vercel Gateway ]  →  [ This GitHub Repo ]
    (Permanent QR)           (Private/Hidden)       (Public/Transferable)
