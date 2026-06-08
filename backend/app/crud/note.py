from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.note import Note
from app.schemas.note import NoteCreate


def list_notes(db: Session) -> list[Note]:
    statement = select(Note).order_by(Note.id.desc())
    return list(db.scalars(statement))


def get_note(db: Session, note_id: int) -> Note | None:
    return db.get(Note, note_id)


def create_note(db: Session, payload: NoteCreate) -> Note:
    note = Note(title=payload.title, content=payload.content)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note


def delete_note(db: Session, note_id: int) -> bool:
    note = db.get(Note, note_id)
    if note is None:
        return False
    db.delete(note)
    db.commit()
    return True
