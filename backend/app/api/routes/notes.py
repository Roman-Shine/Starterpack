from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.crud.note import create_note, delete_note, get_note, list_notes
from app.db.session import get_db
from app.schemas.note import NoteCreate, NoteRead


router = APIRouter()


@router.get("/", response_model=list[NoteRead])
def read_notes(db: Session = Depends(get_db)) -> list[NoteRead]:
    return list_notes(db)


@router.post("/", response_model=NoteRead, status_code=status.HTTP_201_CREATED)
def create_note_route(payload: NoteCreate, db: Session = Depends(get_db)) -> NoteRead:
    return create_note(db, payload)


@router.get("/{note_id}", response_model=NoteRead)
def read_note(note_id: int, db: Session = Depends(get_db)) -> NoteRead:
    note = get_note(db, note_id)
    if note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    return note


@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_note_route(note_id: int, db: Session = Depends(get_db)) -> None:
    deleted = delete_note(db, note_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
