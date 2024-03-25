import api from "./index";

interface FolderRequestDTO {
  folderName: string;
  parentId: number | null;
  fileName: string | null;
}

interface Folder {
  id: number;
  folderName: string;
  parentId: number | null;
  fileName: string | null;
}

// 새 폴더 생성
export const createFolder = async (
  folderRequestDTO: FolderRequestDTO
): Promise<Folder | null> => {
  try {
    const response = await api.post<Folder>("ide/studies", folderRequestDTO);
    return response.data;
  } catch (error) {
    console.error("Error creating folder:", error);
    return null;
  }
};

// 기존 폴더 정보 업데이트
export const updateFolder = async (
  folderId: number,
  parentId: number
): Promise<Folder | null> => {
  try {
    const response = await api.put<Folder>(`ide/${folderId}`, null, {
      params: {
        parentId: parentId.toString(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating folder:", error);
    return null;
  }
};

// 특정 폴더 삭제
export const deleteFolder = async (folderId: number): Promise<void> => {
  try {
    await api.delete(`ide/${folderId}`);
  } catch (error) {
    console.error("Error deleting folder:", error);
  }
};

// 모든 폴더 조회
export const getAllFolders = async (): Promise<Folder[]> => {
  try {
    const response = await api.get<Folder[]>("ide/studies");
    return response.data;
  } catch (error) {
    console.error("Error getting all folders:", error);
    return [];
  }
};

// 특정 부모 ID를 가진 자식 폴더들을 조회
export const getChildFolders = async (parentId: number): Promise<Folder[]> => {
  try {
    const response = await api.get<Folder[]>(`ide/${parentId}/childFolders`);
    return response.data;
  } catch (error) {
    console.error("Error getting child folders:", error);
    return [];
  }
};

export default {
  createFolder,
  updateFolder,
  deleteFolder,
  getAllFolders,
  getChildFolders,
};
