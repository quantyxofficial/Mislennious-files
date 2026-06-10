export interface Task {
  id: string;
  title: string;
  shortDescription: string;
  scenario: string;
  instructions: string[];
  deliverable: string;
  hints: string[];
  expectedAnswerSubstring: string; // Simplistic substring or regex for simulation check
  sampleAnswer: string;
  skills: string[];
  timeEstimate: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface InternshipProgram {
  title: string;
  company: string;
  industry: string;
  overview: string;
  objectives: string[];
  tasks: Task[];
}

export const internshipProgram: InternshipProgram = {
  title: "QR Verified Data Science Challenge",
  company: "The Global Collective",
  industry: "Artificial Intelligence & Data Science",
  overview: "Welcome to the Data Science Project Challenge. This 5-module intensive pipeline is designed to test your analytical rigor. You will work through realistic scenarios focusing on exploratory data analysis, feature engineering, and predictive modeling. Complete the problems to earn your strictly QR Verified Certificate—at exactly zero rupees.",
  objectives: [
    "Master foundational principles of Exploratory Data Analysis (EDA).",
    "Implement robust feature engineering for machine learning models.",
    "Design and train predictive algorithms on complex datasets.",
    "Communicate data-driven insights through an executive summary."
  ],
  tasks: [
    {
      id: "task-1",
      title: "Module 1: Data Wrangling & Imputation",
      shortDescription: "Cleanse and prepare raw datasets for analysis.",
      timeEstimate: "30-45 mins",
      difficulty: "Beginner",
      scenario: "You have received a raw customer churn dataset containing missing values in critical columns like 'CustomerLifespan' and 'MonthlySpend'. Before any analysis, these must be handled appropriately.",
      instructions: [
        "1. Analyze the dataset structure.",
        "2. Write a Python snippet using pandas to fill missing 'MonthlySpend' values with the median of the column.",
        "3. Drop any rows where 'CustomerLifespan' is missing."
      ],
      deliverable: "Python pandas script",
      hints: [
        "Use df['column'].fillna() with df['column'].median().",
        "Use df.dropna(subset=['column'])."
      ],
      expectedAnswerSubstring: "fillna",
      sampleAnswer: "```python\nimport pandas as pd\n\ndef clean_data(df):\n    # Impute missing MonthlySpend with median\n    median_spend = df['MonthlySpend'].median()\n    df['MonthlySpend'] = df['MonthlySpend'].fillna(median_spend)\n    \n    # Drop rows with missing CustomerLifespan\n    df = df.dropna(subset=['CustomerLifespan'])\n    return df\n```",
      skills: ["Data Cleaning", "Python", "Pandas"]
    },
    {
      id: "task-2",
      title: "Module 2: Feature Engineering",
      shortDescription: "Transform categorical variables into machine-readable formats.",
      timeEstimate: "45-60 mins",
      difficulty: "Intermediate",
      scenario: "Machine learning models require numerical input. Your dataset has a categorical feature 'SubscriptionBase' (Values: Basic, Premium, Elite). You need to one-hot encode this feature.",
      instructions: [
        "1. Write a Python function using pandas or scikit-learn to one-hot encode the 'SubscriptionBase' column.",
        "2. Ensure you drop the original categorical column after encoding.",
        "3. Briefly explain why dummy variable trap avoidance (drop_first=True) might be necessary in linear models."
      ],
      deliverable: "Python script and a 1-sentence explanation.",
      hints: [
        "pd.get_dummies() is highly effective here.",
        "Think about multicollinearity."
      ],
      expectedAnswerSubstring: "dummies",
      sampleAnswer: "```python\nimport pandas as pd\n\ndef encode_features(df):\n    df = pd.get_dummies(df, columns=['SubscriptionBase'], drop_first=True)\n    return df\n```\nExplanation: Dropping the first encoded column prevents perfect multicollinearity (the dummy variable trap), which can distort weight estimation in linear regression models.",
      skills: ["Feature Engineering", "Data Transformation", "Machine Learning"]
    },
    {
      id: "task-3",
      title: "Module 3: Predictive Modeling",
      shortDescription: "Train a Random Forest classifier to predict churn.",
      timeEstimate: "60 mins",
      difficulty: "Advanced",
      scenario: "The data is clean and features are engineered. Now, construct a Random Forest classifier to predict the target variable 'Churn' (1 for churn, 0 for retain).",
      instructions: [
        "1. Instantiate a Random Forest Classifier using scikit-learn.",
        "2. Set the number of estimators to 100 and a random_state of 42 for reproducibility.",
        "3. Write the fit() logic assuming 'X_train' and 'y_train' are available."
      ],
      deliverable: "Model training script.",
      hints: [
        "Import from sklearn.ensemble.",
        "Don't worry about data splitting, assume X_train and y_train exist."
      ],
      expectedAnswerSubstring: "fit",
      sampleAnswer: "```python\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Initialize the model\nrf_model = RandomForestClassifier(n_estimators=100, random_state=42)\n\n# Train the model\nrf_model.fit(X_train, y_train)\n```",
      skills: ["Model Training", "Scikit-Learn", "Random Forest"]
    },
    {
      id: "task-4",
      title: "Module 4: Model Evaluation",
      shortDescription: "Assess the classifier using precision, recall, and F1-score.",
      timeEstimate: "30 mins",
      difficulty: "Beginner",
      scenario: "Your Random Forest model has generated predictions. Since customer churn datasets are often imbalanced (retention >> churn), accuracy is not enough. You need to evaluate using a classification report.",
      instructions: [
        "1. Write the Python code to generate a classification report.",
        "2. You have access to 'y_test' (actuals) and 'y_pred' (predictions).",
        "3. Return the report as a string or print it."
      ],
      deliverable: "Evaluation script.",
      hints: [
        "Import classification_report from sklearn.metrics.",
        "Pass y_test and y_pred to the function."
      ],
      expectedAnswerSubstring: "classification",
      sampleAnswer: "```python\nfrom sklearn.metrics import classification_report\n\ndef evaluate_model(y_test, y_pred):\n    report = classification_report(y_test, y_pred)\n    print(report)\n    return report\n```",
      skills: ["Model Evaluation", "Statistics", "Metrics"]
    },
    {
      id: "task-5",
      title: "Module 5: Executive Impact Summary",
      shortDescription: "Translate technical results into actionable business insights.",
      timeEstimate: "45 mins",
      difficulty: "Intermediate",
      scenario: "The data science phase is complete. The Chief Marketing Officer (CMO) needs an executive summary of your findings to allocate retention budgets effectively.",
      instructions: [
        "1. Write a 2-paragraph business summary.",
        "2. Paragraph 1: Mention the methodology (cleaning, engineering, Random Forest) without being overly technical.",
        "3. Paragraph 2: Explain how the F1-score ensures we accurately identify at-risk customers without wasting budget on false positives."
      ],
      deliverable: "Professional Executive Summary.",
      hints: [
        "Focus on business value (budget efficiency, targeted retention).",
        "Keep the tone professional and accessible."
      ],
      expectedAnswerSubstring: "budget",
      sampleAnswer: "To the Chief Marketing Officer,\n\nWe have successfully developed a predictive model to identify customers at high risk of churn. By rigorously cleaning our historical datasets and isolating key behavioral indicators—such as subscription tier usage—we trained a robust algorithmic model to evaluate customer trajectories. This allows us to preemptively flag accounts that are statistically likely to degrade in the coming quarter.\n\nCrucially, our evaluation prioritized precision and recall over blunt accuracy. This means the model is highly effective at minimizing false positives, ensuring that your retention budgets and targeted intervention campaigns are deployed solely on truly at-risk accounts. This targeted approach will optimize spend efficiency while actively protecting our recurring revenue base.",
      skills: ["Technical Communication", "Business Analytics", "Stakeholder Management"]
    }
  ]
};
