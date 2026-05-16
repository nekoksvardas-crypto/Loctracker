# Realtime Transport Monitoring System

Šis projektas paruošia bazinę architektūrą realaus laiko transporto stebėjimui su ateities plėtros galimybėmis.

## Funkcionalumai

- `fleet` lentelė transporto priemonėms ir jų būsenai.
- Vairuotojų darbo valandų (`driver_hours`) kaupimas.
- Perspėjimai dėl pertraukų (`break_warnings`).
- Live GPS simuliacija per WebSocket kanalą.
- Užsakymų būsenų (`order_statuses`) srautas.
- Ateičiai paruošta WebSocket architektūra su topic-based kanalais.

## Struktūra

- `db/schema.sql` – SQL schema (PostgreSQL).
- `src/models.py` – domeno modeliai.
- `src/simulator.py` – live GPS ir statusų simuliatorius.
- `src/websocket_hub.py` – topic-based WebSocket brokerio logika.
- `src/main.py` – WebSocket serverio paleidimas.

## Kaip paleisti (lokaliai)

1. Įdiekite priklausomybes:

```bash
pip install -r requirements.txt
```

2. Paleiskite serverį:

```bash
python -m src.main
```

3. Prisijunkite WebSocket klientu prie:

- `ws://localhost:8765/ws/fleet`
- `ws://localhost:8765/ws/orders`
- `ws://localhost:8765/ws/warnings`

## Ateities plėtra

- Integracija su Kafka/NATS vietoje in-memory brokerio.
- Persistuojamas event sourcing sluoksnis.
- JWT autentikacija WebSocket kanaluose.
- Horizontalus skaliavimas su Redis pub/sub.
