import User from './users.model.js';

const deleteUnconfirmedUsers = async () => {
  const expirationTime = new Date(Date.now() - 2 * 60 * 1000); 

  try {
    const result = await User.deleteMany({
      isConfirmed: false,
      createdAt: { $lt: expirationTime },
    });
    console.log(`Usuários não confirmados deletados: ${result.deletedCount}`);
  } catch (error) {
    console.error('Erro ao deletar usuários não confirmados:', error);
  }
};

setInterval(deleteUnconfirmedUsers, 60 * 1000);
