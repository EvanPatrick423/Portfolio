import React, { useState, useEffect, useCallback } from 'react';
import './ToDoWidget.css';

const ToDoWidget = () => {
  // State management
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  // Form state for new task
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Draft'
  });

  // Statistics
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
    drafTasks: 0
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('todoProjects');
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects);
        setProjects(parsedProjects);
        if (parsedProjects.length > 0) {
          setCurrentProject(parsedProjects[0]);
          loadTasks(parsedProjects[0].id);
        }
      } catch (error) {
        console.error('Error parsing saved projects:', error);
        initializeDefaultProject();
      }
    } else {
      initializeDefaultProject();
    }
  }, []);

  // Save projects to localStorage
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('todoProjects', JSON.stringify(projects));
    }
  }, [projects]);

  // Save tasks to localStorage
  useEffect(() => {
    if (currentProject && tasks.length >= 0) {
      localStorage.setItem(`tasks_${currentProject.id}`, JSON.stringify(tasks));
    }
    updateStats();
  }, [tasks, currentProject]);

  // Initialize default project
  const initializeDefaultProject = () => {
    const defaultProject = {
      id: Date.now().toString(),
      title: 'My First Project',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setProjects([defaultProject]);
    setCurrentProject(defaultProject);
    
    const defaultTask = {
      id: Date.now().toString(),
      title: 'Welcome to your Todo App!',
      description: 'Double-click to edit any task or project',
      dueDate: '',
      createdDate: new Date().toISOString().split('T')[0],
      priority: 'Medium',
      status: 'Draft',
      checklist: [],
      notes: 'Click here to add notes...'
    };
    setTasks([defaultTask]);
  };

  // Load tasks for a project
  const loadTasks = (projectId) => {
    const savedTasks = localStorage.getItem(`tasks_${projectId}`);
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error parsing saved tasks:', error);
        setTasks([]);
      }
    } else {
      setTasks([]);
    }
  };

  // Update statistics
  const updateStats = useCallback(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'Done').length;
    const overdueTasks = tasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      return dueDate < today && task.status !== 'Done';
    }).length;
    const draftTasks = tasks.filter(task => task.status === 'Draft').length;

    setStats({
      totalTasks,
      completedTasks,
      overdueTasks,
      draftTasks
    });
  }, [tasks]);

  // Add new project
  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: 'New Project',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setProjects(prev => [...prev, newProject]);
    setCurrentProject(newProject);
    setTasks([]);
  };

  // Delete project
  const deleteProject = (projectId) => {
    if (projects.length <= 1) {
      alert('You must have at least one project');
      return;
    }
    
    setProjects(prev => prev.filter(p => p.id !== projectId));
    localStorage.removeItem(`tasks_${projectId}`);
    
    if (currentProject?.id === projectId) {
      const remainingProjects = projects.filter(p => p.id !== projectId);
      if (remainingProjects.length > 0) {
        setCurrentProject(remainingProjects[0]);
        loadTasks(remainingProjects[0].id);
      }
    }
  };

  // Update project
  const updateProject = (projectId, newTitle) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, title: newTitle }
        : project
    ));
  };

  // Switch project
  const switchProject = (project) => {
    setCurrentProject(project);
    loadTasks(project.id);
    setEditingTask(null);
    setEditingProject(null);
  };

  // Add new task
  const addTask = () => {
    if (!newTask.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const task = {
      id: Date.now().toString(),
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      dueDate: newTask.dueDate,
      createdDate: new Date().toISOString().split('T')[0],
      priority: newTask.priority,
      status: newTask.status,
      checklist: [],
      notes: ''
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
      status: 'Draft'
    });
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    if (editingTask?.id === taskId) {
      setEditingTask(null);
    }
  };

  // Update task
  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates }
        : task
    ));
  };

  // Toggle task status
  const toggleTaskStatus = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newStatus = task.status === 'Done' ? 'Draft' : 'Done';
      updateTask(taskId, { status: newStatus });
    }
  };

  // Add checklist item
  const addChecklistItem = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newItem = {
        id: Date.now().toString(),
        title: 'New checklist item',
        completed: false
      };
      updateTask(taskId, { 
        checklist: [...(task.checklist || []), newItem] 
      });
    }
  };

  // Update checklist item
  const updateChecklistItem = (taskId, itemId, updates) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const updatedChecklist = task.checklist.map(item => 
        item.id === itemId 
          ? { ...item, ...updates }
          : item
      );
      updateTask(taskId, { checklist: updatedChecklist });
    }
  };

  // Delete checklist item
  const deleteChecklistItem = (taskId, itemId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const updatedChecklist = task.checklist.filter(item => item.id !== itemId);
      updateTask(taskId, { checklist: updatedChecklist });
    }
  };

  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'Done': return 'status-done';
      case 'In Progress': return 'status-progress';
      case 'Overdue': return 'status-overdue';
      default: return 'status-draft';
    }
  };

  // Get priority class
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  return (
    <div className="todo-widget">
      <div className="todo-header">
        <div className="title-section">
          <h2 className="todo-title">📝 Todo Manager</h2>
          <p className="todo-subtitle">Organize your projects and tasks efficiently</p>
        </div>
        
        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-icon">📋</span>
            <div className="stat-info">
              <span className="stat-value">{stats.totalTasks}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">✅</span>
            <div className="stat-info">
              <span className="stat-value">{stats.completedTasks}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⚠️</span>
            <div className="stat-info">
              <span className="stat-value">{stats.overdueTasks}</span>
              <span className="stat-label">Overdue</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📝</span>
            <div className="stat-info">
              <span className="stat-value">{stats.draftTasks}</span>
              <span className="stat-label">Draft</span>
            </div>
          </div>
        </div>
      </div>

      <div className="todo-content">
        <div className="projects-sidebar">
          <div className="projects-header">
            <h3 className="section-title">📁 Projects</h3>
            <button className="add-project-btn" onClick={addProject}>
              <span className="btn-icon">➕</span>
            </button>
          </div>
          
          <div className="projects-list">
            {projects.map(project => (
              <div 
                key={project.id} 
                className={`project-item ${currentProject?.id === project.id ? 'active' : ''}`}
              >
                {editingProject === project.id ? (
                  <input
                    type="text"
                    className="project-input"
                    value={project.title}
                    onChange={(e) => updateProject(project.id, e.target.value)}
                    onBlur={() => setEditingProject(null)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setEditingProject(null);
                    }}
                    autoFocus
                  />
                ) : (
                  <div 
                    className="project-content"
                    onClick={() => switchProject(project)}
                    onDoubleClick={() => setEditingProject(project.id)}
                  >
                    <span className="project-title">{project.title}</span>
                    <span className="project-date">{project.createdDate}</span>
                  </div>
                )}
                
                <button 
                  className="delete-project-btn"
                  onClick={() => deleteProject(project.id)}
                  title="Delete project"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="tasks-main">
          <div className="tasks-header">
            <div className="current-project">
              <h3 className="project-name">
                {currentProject ? currentProject.title : 'No Project Selected'}
              </h3>
            </div>
            
            <div className="add-task-form">
              <input
                type="text"
                className="task-title-input"
                placeholder="Enter task title..."
                value={newTask.title}
                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addTask();
                }}
              />
              
              <select
                className="task-priority-select"
                value={newTask.priority}
                onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              
              <input
                type="date"
                className="task-date-input"
                value={newTask.dueDate}
                onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
              />
              
              <button className="add-task-btn" onClick={addTask}>
                <span className="btn-icon">➕</span>
                <span className="btn-text">Add Task</span>
              </button>
            </div>
          </div>

          <div className="tasks-container">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h4 className="empty-title">No tasks yet</h4>
                <p className="empty-message">Add your first task to get started</p>
              </div>
            ) : (
              <div className="tasks-list">
                {tasks.map(task => (
                  <div key={task.id} className="task-card">
                    <div className="task-header">
                      <div className="task-title-section">
                        {editingTask === task.id ? (
                          <input
                            type="text"
                            className="task-title-edit"
                            value={task.title}
                            onChange={(e) => updateTask(task.id, { title: e.target.value })}
                            onBlur={() => setEditingTask(null)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') setEditingTask(null);
                            }}
                            autoFocus
                          />
                        ) : (
                          <h4 
                            className="task-title"
                            onDoubleClick={() => setEditingTask(task.id)}
                          >
                            {task.title}
                          </h4>
                        )}
                        
                        <div className="task-meta">
                          <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                            {task.priority}
                          </span>
                          {task.dueDate && (
                            <span className="task-due-date">
                              Due: {task.dueDate}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="task-actions">
                        <button
                          className={`status-btn ${getStatusClass(task.status)}`}
                          onClick={() => toggleTaskStatus(task.id)}
                        >
                          {task.status === 'Done' ? '✅' : '📝'}
                        </button>
                        
                        <button 
                          className="delete-task-btn"
                          onClick={() => deleteTask(task.id)}
                        >
                          ❌
                        </button>
                      </div>
                    </div>

                    <div className="task-body">
                      <div className="task-description">
                        <textarea
                          className="description-input"
                          placeholder="Add description..."
                          value={task.description}
                          onChange={(e) => updateTask(task.id, { description: e.target.value })}
                        />
                      </div>

                      <div className="task-checklist">
                        <div className="checklist-header">
                          <span className="checklist-title">Checklist</span>
                          <button 
                            className="add-checklist-btn"
                            onClick={() => addChecklistItem(task.id)}
                          >
                            ➕
                          </button>
                        </div>
                        
                        <div className="checklist-items">
                          {(task.checklist || []).map(item => (
                            <div key={item.id} className="checklist-item">
                              <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={(e) => updateChecklistItem(task.id, item.id, { completed: e.target.checked })}
                              />
                              <input
                                type="text"
                                className="checklist-input"
                                value={item.title}
                                onChange={(e) => updateChecklistItem(task.id, item.id, { title: e.target.value })}
                              />
                              <button 
                                className="delete-checklist-btn"
                                onClick={() => deleteChecklistItem(task.id, item.id)}
                              >
                                ❌
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoWidget;
