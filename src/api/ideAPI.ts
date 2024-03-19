import api from "./index";

interface Folder {
  id?: number;
  name: string;
  parentId?: number;
}

export const createFolder = async (folderName: string, parentId: number) => {
  const response = await api.post<Folder>(`/ide`, {
    folderName,
    parentId,
  });
  return response.data;
};

export const getAllFolders = async () => {
  const response = await api.get("/ide");
  return response.data;
};

export const updateFolder = async (folderId: number, parentId: number) => {
  const response = await api.put<Folder>(`/ide/${folderId}`, {
    parentId,
  });
  return response.data;
};

export const deleteFolder = async (folderId: number) => {
  await api.delete<void>(`/ide/${folderId}`);
};

export const getChildFolders = async (parentId: number) => {
  const response = await api.get<Folder[]>(`ide/${parentId}/childFolders`);
  return response.data;
};
