import { Request, Response } from "express";
import catchAsync from "../../../../utils/middleware/catchAsync";
import { prisma } from "../../../../../prisma/prisma-client";

export const newNoteController = catchAsync(
  async (req: Request, res: Response) => {
    const { folder_name, user_email, note } = req.body;

    if (!user_email || !note) {
      return res.status(400).json({
        status: "error",
        message: "Missing fields",
      });
    }

    if (!folder_name) {
      const quickNotesFolder = await prisma.folder.findUnique({
        where: {
          folder_name: "Quick Notes",
        },
      });

      if (!quickNotesFolder) {
        const folder = await prisma.folder.create({
          data: {
            folder_name: "Quick Notes",
            user_email: user_email,
          },
        });

        const newNote = await prisma.note.create({
          data: {
            user_email: user_email,
            note: note,
            folderId: folder.id,
          },
        });

        res.status(200).json({ message: "Note created", note: newNote });
      } else {
        const newNote = await prisma.note.create({
          data: {
            user_email: user_email,
            note: note,
            folderId: quickNotesFolder.id,
          },
        });

        res.status(200).json({ message: "Note created", note: newNote });
      }
    }

    const folderExist = await prisma.folder.findUnique({
      where: {
        folder_name,
      },
    });

    if (folderExist) {
      const newNote = await prisma.note.create({
        data: {
          user_email: user_email,
          note: note,
          folderId: folderExist.id,
        },
      });

      return res.status(200).json({ message: "Note created", note: newNote });
    }

    const newFolder = await prisma.folder.create({
      data: {
        folder_name,
        user_email: user_email,
      },
    });

    const newNote = await prisma.note.create({
      data: {
        user_email: user_email,
        note: note,
        folderId: newFolder.id,
      },
    });

    res.status(200).json({ message: "Note created", note: newNote });
  }
);
